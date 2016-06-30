import {Component, ViewEncapsulation, Inject} from '@angular/core';
import template from './agile-task-detail.html!text';
import {PluginData} from '../../../lib/plugin/plugin';
import {Project} from '../../../lib/project/project';
import {ProjectTaskDetails} from '../../../lib/project/project-task-details/project-task-details';
import {Editor} from '../../../lib/ui/editor/editor';

@Component({
  selector: 'ngc-agile-task-detail',
  encapsulation: ViewEncapsulation.None,
  template,
  host: {
    class: 'agile-task-detail'
  },
  directives: [Editor]
})
export class AgileTaskDetail {
  constructor(@Inject(Project) project, @Inject(ProjectTaskDetails) projectTaskDetails, @Inject(PluginData) pluginData) {
    // We're using the project component reference to perform updates on the live document
    this.project = project;
    // The reference to the ProjectTaskDetails component, where this plugin component is placed, will provide us with the task data object
    this.projectTaskDetails = projectTaskDetails;
    // Extracting the plugin instance for accessing the available story points we are storing centralized there
    this.plugin = pluginData.plugin.instance;
  }

  // Will be called by the Editor component
  onStoryPointsSaved(storyPoints) {
    // We're setting the new storyPoints directly on the task data object inside the ProjectTaskDetails component
    this.projectTaskDetails.task.storyPoints = +storyPoints || 0;
    // We save the project data update using the live document on the Project component
    this.project.document.persist();
  }

  increaseStoryPoints() {
    // Let's find the next higher story point value and store in on the task data object
    const current = this.projectTaskDetails.task.storyPoints || 0;
    const storyPoints = this.plugin.storyPoints.slice().sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
    this.projectTaskDetails.task.storyPoints =
      storyPoints.find((storyPoints) => storyPoints > current) || current;
    // We save the project data update using the live document on the Project component
    this.project.document.persist();
  }

  decreaseStoryPoints() {
    // Let's find the next lower story point value and store in on the task data object
    const current = this.projectTaskDetails.task.storyPoints || 0;
    const storyPoints = this.plugin.storyPoints.slice().sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    this.projectTaskDetails.task.storyPoints =
      storyPoints.find((storyPoints) => storyPoints < current) || current;
    // We save the project data update using the live document on the Project component
    this.project.document.persist();
  }
}
