import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import template from './project-activities.html!text';
import {Activities} from '../../activities/activities';
import {Project} from '../project';

@Component({
  selector: 'ngc-project-activities',
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Activities]
})
export class ProjectActivities {
  constructor(@Inject(forwardRef(() => Project)) project) {
    this.project = project;
  }
}
