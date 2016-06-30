import {Component, ViewEncapsulation, Input} from '@angular/core';
import template from './navigation.html!text';
// The navigation component consists of the user area and navigation sections
import {NavigationSection} from './navigation-section/navigation-section';
import {UserArea} from '../user/user-area/user-area';

// This component represents the main navigation
@Component({
  selector: 'ngc-navigation',
  host: {
    class: 'navigation'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [NavigationSection, UserArea]
})
export class Navigation {
  @Input() openTasksCount;
}
