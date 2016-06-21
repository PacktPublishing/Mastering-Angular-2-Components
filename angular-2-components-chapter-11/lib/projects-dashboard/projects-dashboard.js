import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import template from './projects-dashboard.html!text';

import {ProjectService} from '../project/project-service/project-service';
import {ProjectSummary} from './project-summary/project-summary';
import {TasksChart} from './tasks-chart/tasks-chart';

@Component({
  selector: 'ngc-projects-dashboard',
  host: {
    class: 'projects-dashboard'
  },
  template,
  directives: [ROUTER_DIRECTIVES, ProjectSummary, TasksChart],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsDashboard {
  constructor(@Inject(ProjectService) projectService) {
    this.projects = projectService.change;
  }
}
