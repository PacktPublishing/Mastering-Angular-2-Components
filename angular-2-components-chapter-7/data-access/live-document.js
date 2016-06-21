import {ReplaySubject} from 'rxjs';

function filterDocumentByQueryFactory(query) {
  return (document) => Object.keys(query).every((property) => document[property] === query[property]);
}

export class LiveDocument {
  constructor(dataProvider, query) {
    this.dataProvider = dataProvider;
    this.data = {};
    this.change = new ReplaySubject(1);
    this.subscription = dataProvider.getLiveChanges()
      .map((change) => change.doc)
      .filter(filterDocumentByQueryFactory(query))
      .subscribe((data) => {
        this.data = data;
        this.change.next(data);
      });
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  persist() {
    if (this.data) {
      this.dataProvider.createOrUpdateDocument(this.data);
    }
  }
}
