import {Component, ViewEncapsulation, ViewChild, ElementRef, Input} from '@angular/core';
import template from './activity-chart.html!text';
import Chartist from 'chartist';

import {rasterize, UNITS} from '../../../utilities/time-utilities.js';

@Component({
  selector: 'ngc-activity-chart',
  host: {
    class: 'activity-chart'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class ActivityChart {
  @Input() activities;
  @ViewChild('chartContainer') chartContainer;

  ngOnChanges() {
    this.createOrUpdateChart();
  }

  ngAfterViewInit() {
    this.createOrUpdateChart();
  }

  createOrUpdateChart() {
    if (!this.activities || !this.chartContainer) {
      return;
    }

    const timeData = this.activities.map((activity) => {
      return {
        time: activity.time,
        weight: 1
      };
    });

    const series = [
      rasterize(
        timeData,
        UNITS.find((unit) => unit.short === 'h').milliseconds,
        24,
        +new Date())
    ];

    if (this.chart) {
      this.chart.update({
        series
      });
    } else {
      this.chart = new Chartist.Bar(this.chartContainer.nativeElement, {
        series
      }, {
        width: '100%',
        height: 60,
        axisY: {
          onlyInteger: true,
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        chartPadding: 0
      });

      this.chart.on('draw', (context) => {
        if (context.type === 'bar' && context.value.y === 0) {
          context.element.attr({
            y2: context.y2 - 1
          });
        }
      });
    }
  }
}
