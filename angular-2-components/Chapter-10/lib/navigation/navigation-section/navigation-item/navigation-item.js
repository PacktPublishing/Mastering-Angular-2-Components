import {Component, ViewEncapsulation, ViewChild, Input, Inject, ChangeDetectorRef} from '@angular/core';
import template from './navigation-item.html!text';
import {RouterLink} from '@angular/router/src/directives/router_link';

// This component represents a single navigation item with a list of navigation items
@Component({
  selector: 'ngc-navigation-item',
  host: {
    class: 'navigation-item',
    // As this component will represent a <li> element, we need to include the correct role for accessibility purpose
    role: 'listitem'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [RouterLink]
})
export class NavigationItem {
  @Input() title;
  @Input() link;
  @ViewChild(RouterLink) routerLink;

  // TODO: Remove after bug is fixed https://github.com/angular/angular/issues/5870
  constructor(@Inject(ChangeDetectorRef) changeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngAfterViewInit() {
    // TODO: Remove after bug is fixed https://github.com/angular/angular/issues/5870
    this.changeDetectorRef.detectChanges();
  }

  isActive() {
    return this.routerLink ? this.routerLink.isActive : false;
  }
}
