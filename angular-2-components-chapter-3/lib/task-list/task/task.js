import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, HostBinding} from '@angular/core';
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
  directives: [Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {
  @Input() task;
  // We are using two event emitters for task updates and deletion
  @Output() taskUpdated = new EventEmitter();
  @Output() taskDeleted = new EventEmitter();

  @HostBinding('class.task--done')
  get done() {
    return this.task && this.task.done;
  }

  // We use this function to update the checked state of our task
  markDone(checked) {
    this.taskUpdated.next({
      title: this.task.title,
      done: checked ? +new Date() : null
    });
  }

  // If we want to delete this task we just emit an event and let the parent component deal with the rest
  deleteTask() {
    this.taskDeleted.next();
  }
}
