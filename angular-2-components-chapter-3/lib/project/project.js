import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './project.html!text';
import {Tabs} from '../ui/tabs/tabs';
import {Tab} from '../ui/tabs/tab/tab';
import {TaskList} from '../task-list/task-list';

// This component represents a project and displays project details
@Component({
  selector: 'ngc-project',
  host: {
    class: 'project'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Tabs, Tab, TaskList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Project {
  @Input() title;
  @Input() description;
  @Input() tasks;
  @Output() projectUpdated = new EventEmitter();

  // This function should be called if the task list of the project was updated
  updateTasks(tasks) {
    this.projectUpdated.next({
      title: this.title,
      description: this.description,
      tasks
    });
  }
}
