import {Component, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './task-list.html!text';
import {Task} from './task/task';
import {EnterTask} from './enter-task/enter-task';
import {Toggle} from '../ui/toggle/toggle';

@Component({
  selector: 'ngc-task-list',
  host: {
    class: 'task-list'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Task, EnterTask, Toggle],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList {
  @Input() tasks;
  // Event emitter for emitting an event once the task list has been changed
  @Output() tasksUpdated = new EventEmitter();

  constructor() {
    this.taskFilterList = ['all', 'open', 'done'];
    this.selectedTaskFilter = 'all';
  }

  ngOnChanges(changes) {
    if (changes.tasks) {
      this.taskFilterChange(this.selectedTaskFilter);
    }
  }

  taskFilterChange(filter) {
    this.selectedTaskFilter = filter;
    this.filteredTasks = this.tasks ? this.tasks.filter((task) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'open') {
        return !task.done;
      } else {
        return task.done;
      }
    }) : [];
  }

  // We use the reference of the old task to updated one specific item within the task list.
  onTaskUpdated(task, updatedData) {
    const tasks = this.tasks.slice();
    tasks.splice(tasks.indexOf(task), 1, Object.assign({}, task, updatedData));
    this.tasksUpdated.next(tasks);
  }

  // Using the reference of a task, this function will remove it from the tasks list and send an update
  onTaskDeleted(task) {
    const tasks = this.tasks.slice();
    tasks.splice(tasks.indexOf(task), 1);
    this.tasksUpdated.next(tasks);
  }

  // Function to add a new task
  addTask(title) {
    const tasks = this.tasks.slice();
    tasks.push({
      created: +new Date(),
      title,
      done: null
    });
    this.tasksUpdated.next(tasks);
  }
}
