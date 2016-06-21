import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import template from './project-task-list.html!text';
import {TaskList} from '../../task-list/task-list';
import {Project} from '../project';

@Component({
  selector: 'ngc-project-task-list',
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [TaskList]
})
export class ProjectTaskList {
  constructor(@Inject(forwardRef(() => Project)) project) {
    this.project = project;
  }

  updateTasks(tasks) {
    this.project.updateTasks(tasks);
  }
}
