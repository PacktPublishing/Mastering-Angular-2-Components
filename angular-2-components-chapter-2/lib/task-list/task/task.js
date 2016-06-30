import {Component, Input, ViewEncapsulation, HostBinding} from '@angular/core';
import template from './task.html!text';
// Each task has a checkbox component for marking tasks as done.
import {Checkbox} from '../../ui/checkbox/checkbox';

@Component({
  selector: 'ngc-task',
  host: {
    class: 'task'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  // We need to specify that this component relies on the Checkbox component within the view.
  directives: [Checkbox]
})
export class Task {
  // Our task model can be attached on the host within the view
  @Input() task;

  @HostBinding('class.task--done')
  get done() {
    return this.task && this.task.done;
  }
}
