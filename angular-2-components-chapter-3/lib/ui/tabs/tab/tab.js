import {Component, Input, ViewEncapsulation, HostBinding} from '@angular/core';
import template from './tab.html!text';

@Component({
  selector: 'ngc-tab',
  host: {
    class: 'tabs__tab'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class Tab {
  @Input() name;
  @HostBinding('class.tabs__tab--active') active = false;
}
