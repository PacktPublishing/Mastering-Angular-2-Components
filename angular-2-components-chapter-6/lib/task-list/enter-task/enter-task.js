import {Component, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './enter-task.html!text';

@Component({
  selector: 'ngc-enter-task',
  host: {
    class: 'enter-task'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterTask {
  // Event emitter that gets fired once a task is entered.
  @Output() taskEntered = new EventEmitter();

  // This function will fire the taskEntered event emitter and reset the task title input field.
  enterTask(titleInput) {
    this.taskEntered.next(titleInput.value);
    titleInput.value = '';
    titleInput.focus();
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.enterTask(event.target);
    }
  }
}
