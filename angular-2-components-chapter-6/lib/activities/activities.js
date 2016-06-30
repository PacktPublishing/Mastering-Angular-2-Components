import {Component, ViewEncapsulation, Inject, Input} from '@angular/core';
import template from './activities.html!text';
import {ActivityService} from './activity-service/activity-service';
import {ActivitySlider} from './activity-slider/activity-slider';
import {Activity} from './activity/activity';

@Component({
  selector: 'ngc-activities',
  host: {
    class: 'activities'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [ActivitySlider, Activity]
})
export class Activities {
  @Input() activitySubject;

  constructor(@Inject(ActivityService) activityService) {
    this.activityService = activityService;
  }

  ngOnChanges(changes) {
    if (changes.activitySubject) {
      // If we have a subscription to the activities service already we need to unsubscribe first
      if (this.activitiesChangeSubscription) {
        this.activitiesChangeSubscription.unsubscribe();
      }

      // When the project data is updated we need to filter for activities again
      this.activitiesChangeSubscription = this.activityService.change.subscribe((activities) => {
        // Filter for all activities that have the project ID as subject
        this.activities = activities
          .filter((activity) => activity.subject === this.activitySubject.id);
        this.onSelectionChange();
      });
    }
  }

  // If the selection within the activity slider changes, we need to filter out activities again
  onSelectionChange(selection = this.selection) {
    this.selection = selection;
    // Store filtered activities that fall into the date range selection specified by the slider
    this.selectedActivities = this.selection ? this.activities.filter(
      (activity) => activity.time >= this.selection.start && activity.time <= this.selection.end
    ) : this.activities;
  }

  // Get an alignment string based on the index. Activities with even index get aligned left while odds get aligned right.
  getAlignment(index) {
    return index % 2 === 0 ? 'left' : 'right';
  }

  // Function to determine if an activity index is first
  isFirst(index) {
    return index === 0;
  }

  // Function to determine if an activity index is last
  isLast(index) {
    return index === this.selectedActivities.length - 1;
  }

  // If the component gets destroyed, we need to unsubscribe from the activities change observer
  ngOnDestroy() {
    this.activitiesChangeSubscription.unsubscribe();
  }
}
