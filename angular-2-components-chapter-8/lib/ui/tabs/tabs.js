import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import template from './tabs.html!text';

@Component({
  selector: 'ngc-tabs',
  host: {
    class: 'tabs'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
export class Tabs {
  @Input() items;
}
