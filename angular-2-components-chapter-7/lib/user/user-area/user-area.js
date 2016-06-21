import {Component, ViewEncapsulation, Inject, Input} from '@angular/core';
import template from './user-area.html!text';
import {UserService} from '../user-service/user-service';

// This component represents the user area above the main navigation
@Component({
  selector: 'ngc-user-area',
  host: {
    class: 'user-area'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class UserArea {
  @Input() openTasksCount;

  constructor(@Inject(UserService) userService) {
    this.userService = userService;
  }
}
