import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import template from './checkbox.html!text';

@Component({
  selector: 'ngc-checkbox',
  host: {
    class: 'checkbox'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class Checkbox {
  // An optional label can be set for the checkbox
  @Input() label;
  // If the checkbox is checked or unchecked
  @Input() checked;
  // Event emitter when checked is changed using the convention for two way binding with [(checked)] syntax.
  @Output() checkedChange = new EventEmitter();

  // This function will trigger the checked event emitter
  onCheckedChange(checked) {
    this.checkedChange.next(checked);
  }
}
