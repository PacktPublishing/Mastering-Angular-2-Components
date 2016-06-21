import {Component, ViewEncapsulation, ViewChild, ElementRef, Input} from '@angular/core';
import template from './tasks-chart.html!text';
import Chartist from 'chartist';
import Moment from 'moment';

import {rasterize} from '../../utilities/time-utilities';
import {Toggle} from '../../ui/toggle/toggle';

@Component({
  selector: 'ngc-tasks-chart',
  host: {
    class: 'tasks-chart'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Toggle]
})
export class TasksChart {
  @Input() projects;
  @ViewChild('chartContainer') chartContainer;

  constructor() {
    // Define the available time frames within the chart provided to the user for selection
    this.timeFrames = [{
      name: 'day',
      timeFrame: 600000,
      amount: 144
    }, {
      name: 'week',
      timeFrame: 3600000,
      amount: 168
    }, {
      name: 'year',
      timeFrame: 86400000,
      amount: 360
    }];
    // From the available time frames, we're generating a list of names for later use within the Toggle component
    this.timeFrameNames = this.timeFrames.map((timeFrame) => timeFrame.name);
    // The currently selected timeframe is set to the first available one
    this.selectedTimeFrame = this.timeFrames[0];
  }

  ngOnChanges() {
    if (this.projects) {
      // On changes of the projects input, we need to update the legend
      this.legend = this.projects.map((project, index) => {
        return {
          name: project.title,
          class: `tasks-chart__series--series-${index + 1}`
        };
      });
    }

    this.createOrUpdateChart();
  }

  ngAfterViewInit() {
    this.createOrUpdateChart();
  }

  // Called from the Toggle component if a new timeframe was selected
  onSelectedTimeFrameChange(timeFrameName) {
    // Set the selected time frame to the available timeframe with the name selected in the Toggle component
    this.selectedTimeFrame = this.timeFrames.find((timeFrame) => timeFrame.name === timeFrameName);
    this.createOrUpdateChart();
  }

  createOrUpdateChart() {
    if (!this.projects || !this.chartContainer) {
      return;
    }

    // Create a series array that contains one data series for each project
    const series = this.projects.map((project) => {
      // First we need to reduces all tasks into one timeData list
      const timeData = project.tasks.reduce((timeData, task) => {
        // The created time of the task generates a timeData with weight 1
        timeData.push({
          time: task.created,
          weight: 1
        });
        // If this task is done, we're also generating a timeData object with weight -1
        if (task.done) {
          timeData.push({
            time: task.done,
            weight: -1
          });
        }
        return timeData;
      }, []);

      // Using the rasterize function in accumulation mode, we can create the required data array that represents our series data
      return rasterize(timeData, this.selectedTimeFrame.timeFrame, this.selectedTimeFrame.amount, +new Date(), null, true);
    });

    const now = +new Date();
    // Creating labels for all the timeframes we're displaying
    const labels = Array.from({
      length: this.selectedTimeFrame.amount
    }).map((e, index) => now - index * this.selectedTimeFrame.timeFrame).reverse();

    if (this.chart) {
      // If we already have a valid chart object, we can simply update the series data and labels
      this.chart.update({
        series,
        labels
      });
    } else {
      // Creating a new line chart using the chartContainer element as container
      this.chart = new Chartist.Line(this.chartContainer.nativeElement, {
        series,
        labels
      }, {
        width: '100%',
        height: 300,
        // Using step interpolation, we can cause the chart to render in steps instead of directly connected points
        lineSmooth: Chartist.Interpolation.step({
          // The fill holes setting on the interpolation will cause null values to be skipped and makes our line to connect to the next valid value
          fillHoles: true
        }),
        axisY: {
          onlyInteger: true,
          low: 0,
          offset: 70,
          // We're using the label interpolation function for formatting our open tasks count
          labelInterpolationFnc: (value) => `${value} tasks`
        },
        axisX: {
          // On small screens, we're only displaying two x-axis labels and grid lines
          labelInterpolationFnc: (value, index, array) => index % Math.floor(this.selectedTimeFrame.amount / 2) === 0 ? Moment(value).calendar() : null
        }
      }, [
        ['screen and (min-width: 1200px)', {
          // On larger screens, we're displaying four x-axis labels and grid lines
          axisX: {
            labelInterpolationFnc: (value, index) => index % Math.floor(this.selectedTimeFrame.amount / 4) === 0 ? Moment(value).calendar() : null
          }
        }], ['screen and (min-width: 1500px)', {
          // On large screens, we're displaying six x-axis labels and grid lines
          axisX: {
            labelInterpolationFnc: (value, index) => index % Math.floor(this.selectedTimeFrame.amount / 6) === 0 ? Moment(value).calendar() : null
          }
        }]
      ]);
    }
  }
}
