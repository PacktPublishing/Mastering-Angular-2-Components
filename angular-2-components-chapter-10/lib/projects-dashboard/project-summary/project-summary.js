import {Component, ViewEncapsulation, Input, Inject} from '@angular/core';
import template from './project-summary.html!text';

import {LimitWithEllipsisPipe} from '../../pipes/limit-with-ellipsis';
import {FormatEffortsPipe} from '../../pipes/format-efforts';

import {EffortsTimeline} from '../../efforts/efforts-timeline/efforts-timeline';
import {ActivityService} from '../../activities/activity-service/activity-service';
import {ActivityChart} from './activity-chart/activity-chart';

@Component({
  selector: 'ngc-project-summary',
  host: {
    class: 'project-summary'
  },
  template,
  directives: [EffortsTimeline, ActivityChart],
  pipes: [LimitWithEllipsisPipe, FormatEffortsPipe],
  encapsulation: ViewEncapsulation.None
})
export class ProjectSummary {
  @Input() project;

  constructor(@Inject(ActivityService) activityService) {
    this.activityService = activityService;
  }

  ngOnChanges() {
    if (this.project) {
      this.totalEfforts = this.project.tasks.reduce((totalEfforts, task) => {
        if (task.efforts) {
          totalEfforts.estimated += task.efforts.estimated || 0;
          totalEfforts.effective += task.efforts.effective || 0;
        }

        return totalEfforts;
      }, {
        estimated: 0,
        effective: 0
      });

      this.activities = this.activityService.change
        .map((activities) => activities.filter((activity) => activity.subject === this.project._id));
    }
  }
}
