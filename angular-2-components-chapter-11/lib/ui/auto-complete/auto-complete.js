import {Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import template from './auto-complete.html!text';
import {Editor} from '../editor/editor';

@Component({
  selector: 'ngc-auto-complete',
  host: {
    class: 'auto-complete'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Editor],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoComplete {
  @Input() items;
  @Input() selectedItem;
  @Output() selectedItemChange = new EventEmitter();
  @Output() itemCreated = new EventEmitter();

  constructor() {
    this.filteredItems = [];
  }

  ngOnChanges(changes) {
    if (this.items && this.selectedItem) {
      this.filterItems(this.selectedItem);
    }
  }

  filterItems(filter) {
    this.filter = filter || '';
    this.filteredItems = this.items
      .filter((item) => item.toLowerCase().indexOf(this.filter.toLowerCase().trim()) !== -1)
      .slice(0, 10);
    this.filteredItems.sort();
    this.exactMatch = this.items.includes(this.filter);
  }

  selectItem(item) {
    this.selectedItemChange.next(item);
  }

  createItem(item) {
    this.itemCreated.next(item);
  }

  onEditModeChange(editMode) {
    if (editMode) {
      this.showCallout = true;
      this.previousSelectedItem = this.selectedItem;
    } else {
      this.showCallout = false;
    }
  }

  onEditableInput(content) {
    this.filterItems(content);
  }

  onEditSaved(content) {
    if (content === '') {
      this.selectedItemChange.next(null);
    } else if (content !== this.selectedItem && !this.items.includes(content)) {
      this.itemCreated.next(content);
    }
  }

  onEditCanceled() {
    this.selectedItemChange.next(this.previousSelectedItem);
  }
}
