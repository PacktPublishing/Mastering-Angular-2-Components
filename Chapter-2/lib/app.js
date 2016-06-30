// We need the Component annotation as well as the ViewEncapsulation enumeration
import {Component, ViewEncapsulation} from '@angular/core';

// Using the text loader we can import our template
import template from './app.html!text';

// Our application is relying on the TaskList directive
import {TaskList} from './task-list/task-list';

// This creates our main application component
@Component({
  // Tells Angular to look for an element <ngc-app> to create this component
  selector: 'ngc-app',
  // Let's use the imported HTML template string
  template,
  // Tell Angular to ignore view encapsulation
  encapsulation: ViewEncapsulation.None,
  directives: [TaskList]
})
export class App {}
