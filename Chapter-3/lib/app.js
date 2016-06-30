import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {ProjectService} from './project/project-service/project-service';
import {UserService} from './user/user-service/user-service';
import template from './app.html!text';
import {Project} from './project/project';
import {Navigation} from './navigation/navigation';
import {NavigationSection} from './navigation/navigation-section/navigation-section';
import {NavigationItem} from './navigation/navigation-section/navigation-item/navigation-item';

// Helper class to convert URIs to project ID's and to generate link item models from projects
class LinkConverter {
  static getIdFromLink(link) {
    return link.slice(1);
  }

  static getItemModelFromProject(project) {
    return project ? {
      title: project.title,
      link: `#${project._id}`
    } : {
      title: '',
      link: '#'
    };
  }
}

// Our main application component will be responsible for fetching project data and rendering the main application components.
@Component({
  selector: 'ngc-app',
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Project, Navigation, NavigationSection, NavigationItem],
  providers: [ProjectService, UserService]
})
export class App {
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
          .map((project) => LinkConverter.getItemModelFromProject(project));
        // Uses functional reduce to get a count over open tasks across all projects
        this.openTasksCount = this.projects
          .reduce((count, project) => count + project.tasks.filter((task) => !task.done).length, 0);
        // If there was a project selected, we try to select the same from the new list
        if (this.selectedProject) {
          this.selectedProject = this.projects.find((project) => project._id === this.selectedProject._id);
        }
      });
  }

  // Uses the link converted to generate the link identifier of the currently selected project
  getSelectedProjectLink() {
    return LinkConverter.getItemModelFromProject(this.selectedProject).link;
  }

  // This function will set the selectedProjectIndex based on a link identifier
  selectProjectByLink(link) {
    this.selectedProject = this.projects
      .find((project) => project._id === LinkConverter.getIdFromLink(link));
  }

  // This function updates the selected project data with the data provided as parameter and then persists the changes to the database.
  updateSelectedProject(projectData) {
    Object.assign(this.selectedProject, projectData);
    this.projectService.dataProvider.createOrUpdateDocument(this.selectedProject);
  }

  // If this component gets destroyed, we need to remember to clean up the project subscription
  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
