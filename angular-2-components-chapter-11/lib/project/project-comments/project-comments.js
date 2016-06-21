import {Component, ViewEncapsulation, Inject, forwardRef} from '@angular/core';
import template from './project-comments.html!text';
import {Comments} from '../../comments/comments';
import {Project} from '../project';

@Component({
  selector: 'ngc-project-comments',
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Comments]
})
export class ProjectComments {
  constructor(@Inject(forwardRef(() => Project)) project) {
    this.project = project;
  }

  updateComments(comments) {
    this.project.updateComments(comments);
  }
}
