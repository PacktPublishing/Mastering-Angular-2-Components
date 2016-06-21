import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import template from './task-infos.html!text';
import {TaskInfo} from './task-info/task-info';
import {FormatEffortsPipe} from '../../../pipes/format-efforts';
import {CalendarTimePipe} from '../../../pipes/calendar-time';
import {PluginSlot} from '../../../plugin/plugin-slot';

@Component({
  selector: 'ngc-task-infos',
  host: {
    class: 'task-infos'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [TaskInfo, PluginSlot],
  pipes: [FormatEffortsPipe, CalendarTimePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskInfos {
  @Input() task;
}
