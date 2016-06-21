import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {Router, Routes, Route} from '@angular/router';
import template from './project.html!text';
import {Tabs} from '../ui/tabs/tabs';
import {ProjectTaskList} from './project-task-list/project-task-list';
import {ProjectComments} from './project-comments/project-comments';
import {DataProvider} from '../../data-access/data-provider';
import {LiveDocument} from '../../data-access/live-document';

// This component represents a project and displays project details
@Component({
  selector: 'ngc-project',
  host: {
    class: 'project'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Tabs]
})
@Routes([
  new Route({ path: 'tasks', component: ProjectTaskList}),
  new Route({ path: 'comments', component: ProjectComments})
])
export class Project {
  constructor(@Inject(DataProvider) dataProvider, @Inject(Router) router) {
    this.dataProvider = dataProvider;
    this.router = router;
    this.tabItems = [
      {title: 'Tasks', link: ['tasks']},
      {title: 'Comments', link: ['comments']}
    ];
  }

  routerOnActivate(currentRouteSegment, previousRouteSegment) {
    this.id = currentRouteSegment.getParam('projectId');
    this.document = new LiveDocument(this.dataProvider, {
      type: 'project',
      _id: this.id
    });
    this.document.change.subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.tasks = data.tasks;
      this.comments = data.comments;
    });
    // On route activation, we're navigating directly to the tasks child route
    if (previousRouteSegment) {
      this.router.navigate(['tasks'], currentRouteSegment);
    }
  }

  // This function should be called if the task list of the project was updated
  updateTasks(tasks) {
    this.document.data.tasks = tasks;
    this.document.persist();
  }

  // This function should be called if the comments have been updated
  updateComments(comments) {
    this.document.data.comments = comments;
    this.document.persist();
  }

  ngOnDestroy() {
    this.document.unsubscribe();
  }
}
