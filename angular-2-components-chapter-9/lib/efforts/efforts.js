import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './efforts.html!text';
import {Duration} from '../ui/duration/duration';
import {EffortsTimeline} from './efforts-timeline/efforts-timeline';
import {UNITS} from '../utilities/time-utilities';

@Component({
  selector: 'ngc-efforts',
  host: {
    class: 'efforts'
  },
  template,
  directives: [Duration, EffortsTimeline],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Efforts {
  @Input() estimated;
  @Input() effective;
  @Output() effortsChange = new EventEmitter();

  onEstimatedChange(estimated) {
    this.effortsChange.next({
      estimated,
      effective: this.effective
    });
  }

  onEffectiveChange(effective) {
    this.effortsChange.next({
      effective,
      estimated: this.estimated
    });
  }

  addEffectiveHours(hours) {
    const hourMilliseconds = UNITS.find((unit) => unit.short === 'h').milliseconds;
    this.effortsChange.next({
      effective: (this.effective || 0) + hours * hourMilliseconds,
      estimated: this.estimated
    });
  }
}
