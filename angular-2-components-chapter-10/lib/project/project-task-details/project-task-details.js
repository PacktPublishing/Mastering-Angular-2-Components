import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import template from './project-task-details.html!text';
import {Project} from '../project';
import {Editor} from '../../ui/editor/editor';
import {Efforts} from '../../efforts/efforts';
import {AutoComplete} from '../../ui/auto-complete/auto-complete';
import {PluginSlot} from '../../plugin/plugin-slot';

@Component({
  selector: 'ngc-project-task-details',
  host: {
    class: 'task-details'
  },
  template,
  directives: [Editor, Efforts, AutoComplete, PluginSlot],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTaskDetails {
  constructor(@Inject(forwardRef(() => Project)) project) {
    this.project = project;
  }

  routerOnActivate(currentRouteSegment) {
    const taskNr = currentRouteSegment.getParam('nr');
    this.projectChangeSubscription = this.project.document.change.subscribe((data) => {
      this.task = data.tasks.find((task) => task.nr === +taskNr);
      this.projectMilestones = data.milestones || [];
    });
  }

  onTitleSaved(title) {
    this.task.title = title;
    this.project.document.persist();
  }

  onDescriptionSaved(description) {
    this.task.description = description;
    this.project.document.persist();
  }

  onEffortsChange(efforts) {
    if (!efforts.estimated && !efforts.effective) {
      this.task.efforts = null;
    } else {
      this.task.efforts = efforts;
    }
    this.project.document.persist();
  }

  onMilestoneSelected(milestone) {
    this.task.milestone = milestone;
    this.project.document.persist();
  }

  onMilestoneCreated(milestone) {
    this.project.document.data.milestones = this.project.document.data.milestones || [];
    this.project.document.data.milestones.push(milestone);
    this.task.milestone = milestone;
    this.project.document.persist();
  }

  ngOnDestroy() {
    this.projectChangeSubscription.unsubscribe();
  }
}
