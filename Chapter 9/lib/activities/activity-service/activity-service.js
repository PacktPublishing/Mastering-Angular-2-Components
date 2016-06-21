import {Injectable, Inject} from '@angular/core';
import {DataProvider} from '../../../data-access/data-provider';
import {UserService} from '../../user/user-service/user-service';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class ActivityService {
  constructor(@Inject(DataProvider) dataProvider, @Inject(UserService) userService) {
    // We're exposing a replay subject that will emit events whenever the activities list change
    this.change = new ReplaySubject(1);
    this.dataProvider = dataProvider;
    this.userService = userService;
    this.activities = [];

    // We're creating a subscription to our datastore to get updates on activities
    this.activitiesSubscription = this.dataProvider.getLiveChanges()
      .map((change) => change.doc)
      .filter((document) => document.type === 'activity')
      .subscribe((changedActivity) => {
        this.activities = this.activities.slice();
        // Since activities can only be added we can assume that this change is a new activity
        this.activities.push(changedActivity);
        // Sorting the activities by time to make sure there's no sync issue messing with the ordering
        this.activities.sort((a, b) => a.time > b.time ? -1 : a.time < b.time ? 1 : 0);
        this.change.next(this.activities);
      });
  }

  // This method is logging a new activity
  logActivity(subject, category, title, message) {
    // Using the DataProvider to create a new document in our datastore
    this.dataProvider.createOrUpdateDocument({
      type: 'activity',
      user: this.userService.currentUser,
      time: new Date().getTime(),
      subject,
      category,
      title,
      message
    });
  }
}
