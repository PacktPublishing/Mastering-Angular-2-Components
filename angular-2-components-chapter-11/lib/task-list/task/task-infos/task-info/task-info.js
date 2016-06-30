import {Component, Input, ViewEncapsulation, HostBinding, ChangeDetectionStrategy} from '@angular/core';
import template from './task-info.html!text';

@Component({
  selector: 'ngc-task-info',
  host: {
    class: 'task-infos__info'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskInfo {
  @Input() title;
  @Input() info;

  @HostBinding('style.display')
  get display() {
    return this.info ? null : 'none';
  }
}
