import {Injectable, Inject} from '@angular/core';
import {ReplaySubject} from 'rxjs/Rx';
import {DataProvider} from '../../../data-access/data-provider';

@Injectable()
export class ProjectService {
  constructor(@Inject(DataProvider) dataProvider) {
    this.dataProvider = dataProvider;
    this.projects = [];
    // We're exposing a replay subject that will emit events whenever the projects list change
    this.change = new ReplaySubject(1);

    // Setting up our functional reactive subscription to receive project changes from the database
    this.projectsSubscription = this.dataProvider.getLiveChanges()
      // First convert the change records to actual documents
      .map((change) => change.doc)
      // Filter so that we only receive project documents
      .filter((document) => document.type === 'project')
      // Finally we subscribe to the change observer and deal with project changes in the function parameter
      .subscribe((changedProject) => {
        this.projects = this.projects.slice();
        // On every project change we need to update our projects list as well as sort it by title
        const projectIndex = this.projects.findIndex((project) => project._id === changedProject._id);
        if (projectIndex === -1) {
          this.projects.push(changedProject);
        } else {
          this.projects.splice(projectIndex, 1, changedProject);
        }
        this.projects.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
        // Emit an event on our replay subject
        this.change.next(this.projects);
      });
  }
}
