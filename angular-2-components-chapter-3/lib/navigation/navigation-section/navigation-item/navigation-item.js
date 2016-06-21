import {Component, ViewEncapsulation, Input, Inject, forwardRef} from '@angular/core';
import template from './navigation-item.html!text';
// We rely on the navigation component to know if we are active
import {Navigation} from '../../navigation';

// This component represents a single navigation item with a list of navigation items
@Component({
  selector: 'ngc-navigation-item',
  host: {
    class: 'navigation-item',
    // As this component will represent a <li> element, we need to include the correct role for accessibility purpose
    role: 'listitem'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class NavigationItem {
  @Input() title;
  @Input() link;

  // Because of a forward reference issue caused by hoisting, we need to use forwardRef to resolve the navigation type
  constructor(@Inject(forwardRef(() => Navigation)) navigation) {
    this.navigation = navigation;
  }

  // Here, we are delegating to the navigation component to see if we are active or not
  isActive() {
    return this.navigation.isItemActive(this);
  }

  // If this link is activated we need to tell the navigation component
  onActivate() {
    this.navigation.activateLink(this.link);
  }
}
