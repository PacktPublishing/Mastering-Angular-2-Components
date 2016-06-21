import {Pipe, Inject} from '@angular/core';
import {formatDuration} from '../utilities/time-utilities';

@Pipe({
  name: 'formatEfforts'
})
export class FormatEffortsPipe {
  // The transform method will be called when the pipe is used within a template
  transform(value) {
    if (value == null || typeof value !== 'object') {
      return value;
    }

    return `${formatDuration(value.effective) || 'none'} of ${formatDuration(value.estimated) || 'un-estimated'}`;
  }
}
