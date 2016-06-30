export const UNITS = [{
  short: 'w',
  milliseconds: 5 * 8 * 60 * 60 * 1000
}, {
  short: 'd',
  milliseconds: 8 * 60 * 60 * 1000
}, {
  short: 'h',
  milliseconds: 60 * 60 * 1000
}, {
  short: 'm',
  milliseconds: 60 * 1000
}];

export function formatDuration(timeSpan) {
  return UNITS.reduce((str, unit) => {
    const amount = timeSpan / unit.milliseconds;
    if (amount >= 1) {
      const fullUnits = Math.floor(amount);
      const formatted = `${str} ${fullUnits}${unit.short}`;
      timeSpan -= fullUnits * unit.milliseconds;
      return formatted;
    } else {
      return str;
    }
  }, '').trim();
}

export function parseDuration(formattedDuration) {
  const pattern = /[\d\.]+\s*[wdhm]/g;
  let timeSpan = 0;
  let result;
  while (result = pattern.exec(formattedDuration)) {
    const chunk = result[0].replace(/\s/g, '');
    let amount = Number(chunk.slice(0, -1));
    let unitShortName = chunk.slice(-1);
    timeSpan += amount * UNITS.find((unit) => unit.short === unitShortName).milliseconds;
  }
  return +timeSpan || null;
}

export function rasterize(timeData, timeFrame, quantity, now = +new Date(), fill = 0, accumulate = false) {
  // Floor to a given time frame
  now = Math.floor(now / timeFrame) * timeFrame;
  // Accumulation value used for accumulation mode to keep track of current value
  let accumulatedValue = 0;

  // In accumulation mode we need to be sure that the time data is ordered
  if (accumulate) {
    timeData = timeData.slice().sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
  }

  return timeData.reduce((rasterized, timeData) => {
    // Increase the accumulated value, in case we need it
    accumulatedValue += timeData.weight;
    // Calculating the designated index in the rasterized output array
    const index = Math.ceil((now - timeData.time) / timeFrame);
    // If the index is larger or equal to the designed rasterized array length, we can skip the value
    if (index < quantity) {
      rasterized[index] = accumulate ? accumulatedValue : (rasterized[index] || 0) + timeData.weight;
    }
    return rasterized;
  }, Array.from({length: quantity}).fill(fill)).reverse();
}
