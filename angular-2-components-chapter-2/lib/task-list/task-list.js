import {Component, Inject, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
// The template of the task list using the text plugin of SystemJS
import template from './task-list.html!text';
// The dummy task service where we get our tasks from
import {TaskListService} from './task-list-service';

// The task component that displays each task
import {Task} from './task/task';
// The component for entering new tasks
import {EnterTask} from './enter-task/enter-task';
// We also need a Toggle UI component to provide a filter
import {Toggle} from '../ui/toggle/toggle';

@Component({
  selector: 'ngc-task-list',
  // The host property allows us to set some properties on the HTML element where our component is initialized
  host: {
    class: 'task-list'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  // Set the TaskListService as host provider
  providers: [TaskListService],
  // Specify all directives / components that are used in the view
  directives: [Task, EnterTask, Toggle]
})
export class TaskList {
  // Inject the TaskListService and set our filter data
  constructor(@Inject(TaskListService) taskListService) {
    this.taskListService = taskListService;
    this.taskFilterList = ['all', 'open', 'done'];
    this.selectedTaskFilter = 'all';
  }

  // Method that returns a filtered list of tasks based on the selected task filter string.
  getFilteredTasks() {
    return this.taskListService.tasks ? this.taskListService.tasks.filter((task) => {
      if (this.selectedTaskFilter === 'all') {
        return true;
      } else if (this.selectedTaskFilter === 'open') {
        return !task.done;
      } else {
        return task.done;
      }
    }) : [];
  }

  // Method to add a task from the view
  addTask(title) {
    this.taskListService.tasks.push({
      title,
      done: false
    });
  }
}
