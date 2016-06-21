import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import template from './efforts-timeline.html!text';

@Component({
  selector: 'ngc-efforts-timeline',
  host: {
    class: 'efforts-timeline'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffortsTimeline {
  @Input() estimated;
  @Input() effective;
  @Input() height;

  ngOnChanges(changes) {
    this.done = 0;
    this.overtime = 0;

    if (!this.estimated && this.effective || (this.estimated && this.estimated === this.effective)) {
      // If there's only effective time or if the estimated time is equal to the effective time we are 100% done
      this.done = 100;
    } else if (this.estimated < this.effective) {
      // If we have more effective time than estimated we need to calculate overtime and done in percentage
      this.done = this.estimated / this.effective * 100;
      this.overtime = 100 - this.done;
    } else {
      // The regular case where we have less effective time than estimated
      this.done = this.effective / this.estimated * 100;
    }
  }
}
