import {Component, ViewEncapsulation, ContentChildren} from '@angular/core';
import template from './tabs.html!text';
// We rely on the tab component
import {Tab} from './tab/tab';

@Component({
  selector: 'ngc-tabs',
  host: {
    class: 'tabs'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Tab]
})
export class Tabs {
  // This queries the content inside <ng-content> and stores a query list that will be updated if the content changes
  @ContentChildren(Tab) tabs;

  // The ngAfterContentInit lifecycle hook will be called once the content inside <ng-content> was initialized
  ngAfterContentInit() {
    this.activateTab(this.tabs.first);
  }

  activateTab(tab) {
    // To activate a tab we first convert the live list to an array and deactivate all tabs before we set the new tab active
    this.tabs.toArray().forEach((t) => t.active = false);
    tab.active = true;
  }
}
