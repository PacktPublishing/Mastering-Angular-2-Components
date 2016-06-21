import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {ProjectService} from './project/project-service/project-service';
import {UserService} from './user/user-service/user-service';
import {ActivityService} from './activities/activity-service/activity-service';
import {TagsService} from './tags/tags-service';
import template from './app.html!text';
import {Project} from './project/project';
import {ProjectsDashboard} from './projects-dashboard/projects-dashboard';
import {Navigation} from './navigation/navigation';
import {NavigationSection} from './navigation/navigation-section/navigation-section';
import {NavigationItem} from './navigation/navigation-section/navigation-item/navigation-item';
import {Routes, Route, ROUTER_DIRECTIVES} from '@angular/router';
import {ManagePlugins} from './manage-plugins/manage-plugins';

// Our main application component will be responsible for fetching project data and rendering the main application components.
@Component({
  selector: 'ngc-app',
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Project, Navigation, NavigationSection, NavigationItem, ROUTER_DIRECTIVES],
  providers: [ProjectService, UserService, ActivityService, TagsService]
})
@Routes([
  new Route({path: 'dashboard', component: ProjectsDashboard}),
  new Route({path: 'projects/:projectId', component: Project}),
  new Route({path: 'plugins', component: ManagePlugins})
])
export class App {
  // We use the data provider to obtain a data change observer
  constructor(@Inject(ProjectService) projectService) {
    this.projectService = projectService;
    this.projects = [];

    // Setting up our functional reactive subscription to receive project changes from the database
    this.projectsSubscription = projectService.change
      // We subscribe to the change observer of our service and deal with project changes in the function parameter
      .subscribe((projects) => {
        this.projects = projects;
        // We create new navigation items for our projects
        this.projectNavigationItems = this.projects
          .filter((project) => !project.deleted)
          .map((project) => {
            return {
              title: project.title,
              link: ['/projects', project._id]
            };
          });
        // Uses functional reduce to get a count over open tasks across all projects
        this.openTasksCount = this.projects
          .reduce((count, project) => count + project.tasks.filter((task) => !task.done).length, 0);
      });
  }

  // If this component gets destroyed, we need to remember to clean up the project subscription
  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
