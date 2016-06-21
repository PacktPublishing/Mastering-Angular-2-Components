import {Component, ViewEncapsulation, Input} from '@angular/core';
import template from './navigation-section.html!text';
import {NavigationItem} from './navigation-item/navigation-item';

// This component creates a section within the navigation and lists navigation items
@Component({
  selector: 'ngc-navigation-section',
  host: {
    class: 'navigation-section'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [NavigationItem]
})
export class NavigationSection {
  @Input() title;
  @Input() items;
}
