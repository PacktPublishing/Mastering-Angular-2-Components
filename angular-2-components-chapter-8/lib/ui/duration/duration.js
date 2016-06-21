import {Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './duration.html!text';
import {FormatDurationPipe} from '../../pipes/format-duration';
import {Editor} from '../../ui/editor/editor';
import {parseDuration} from '../../utilities/time-utilities';

@Component({
  selector: 'ngc-duration',
  host: {
    class: 'duration'
  },
  template,
  directives: [Editor],
  pipes: [FormatDurationPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Duration {
  @Input() duration;
  @Output() durationChange = new EventEmitter();

  onEditSaved(formattedDuration) {
    this.durationChange.next(formattedDuration ? parseDuration(formattedDuration) : null);
  }
}
