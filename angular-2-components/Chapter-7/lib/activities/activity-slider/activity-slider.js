import {Component, ViewEncapsulation, Input, Inject, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
import template from './activity-slider.html!text';
import styles from './activity-slider.css!text';
import {CalendarTimePipe} from '../../pipes/calendar-time';

@Component({
  selector: 'ngc-activity-slider',
  host: {
    class: 'activity-slider'
  },
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.Native,
  pipes: [CalendarTimePipe]
})
export class ActivitySlider {
  // The input expects a list of activities
  @Input() activities;
  // If the selection of date range changes within our slider component, we'll emit a change event
  @Output() selectionChange = new EventEmitter();

  constructor(@Inject(ElementRef) elementRef) {
    // We'll use the host element for measurement when drawing the SVG
    this.sliderElement = elementRef.nativeElement;
    // The padding on each side of the slider
    this.padding = 20;
  }

  ngOnChanges(changes) {
    // If the activities input changes we need to re-calculate and re-draw
    if (changes.activities && changes.activities.currentValue) {
      const activities = changes.activities.currentValue;
      // For later calculations we set aside the times of the first and the last activity
      if (activities.length === 1) {
        // If we only have one activity we use the same time for first and last
        this.timeFirst = this.timeLast = activities[0].time;
      } else if (activities.length > 1) {
        // Take first and last time
        this.timeFirst = activities[activities.length - 1].time;
        this.timeLast = activities[0].time;
      } else {
        // No activities yet, so we use the current time for both first and last
        this.timeFirst = this.timeLast = new Date().getTime();
      }

      // The time span is the time from the first activity to the last activity. We need to limit to lower 1 for not messing up later calculations.
      this.timeSpan = Math.max(1, this.timeLast - this.timeFirst);
      // Re-calculate the ticks that we display on top of the slider
      this.computeTicks();
      // Set the selection to the full time spectrum
      this.selection = {
        start: this.timeFirst,
        end: this.timeLast
      };
      // Emit initial event for initial selection
      this.selectionChange.next(this.selection);
    }
  }

  // This function computes 5 ticks with their time and position on the slider
  computeTicks() {
    const count = 5;
    const timeSpanTick = this.timeSpan / count;
    this.ticks = Array.from({length: count}).map((element, index) => {
      return this.timeFirst + timeSpanTick * index;
    });
  }

  // Getting the total available width of the slider
  totalWidth() {
    return this.sliderElement.clientWidth - this.padding * 2;
  }

  // Projects a time stamp into percentage for positioning
  projectTime(time) {
    let position = this.padding +
      (time - this.timeFirst) / this.timeSpan * this.totalWidth();
    return position / this.sliderElement.clientWidth * 100;
  }

  // Projects a pixel value back to a time value. This is required for calculating time stamps from user selection.
  projectLength(length) {
    return this.timeFirst + (length - this.padding) / this.totalWidth() * this.timeSpan;
  }

  // If the component receives a mousedown event, we need to start a new selection
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    // Starting a new selection by setting selection start and end to the projected time of the clicked position.
    this.selection.start = this.selection.end = this.projectLength(event.offsetX);
    // Selection changed so we need to emit event
    this.selectionChange.next(this.selection);
    // Setting a flag so we know that the user is currently moving the selection
    this.modifySelection = true;
  }

  // We also need to track mouse moves within our slider component
  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    // We should only modify the selection if the component is in the correct mode
    if (this.modifySelection) {
      // Update the selection end with the projected time from the mouse coordinates
      this.selection.end = Math.max(this.selection.start, this.projectLength(event.offsetX));
      // Selection changed so we need to emit event
      this.selectionChange.next(this.selection);
      // To prevent side effects, we should stop propagation and prevent browser default
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // If the user is releasing the mouse button, we should stop the modify selection mode
  @HostListener('mouseup')
  onMouseUp() {
    this.modifySelection = false;
  }

  // If the user is leaving the component with the mouse, we should stop the modify selection mode
  @HostListener('mouseleave')
  onMouseLeave() {
    this.modifySelection = false;
  }

  // On a double click, we want to expand the selection to the full time spectrum
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    // Setting the selection to the full range
    this.selection = {
      start: this.timeFirst,
      end: this.timeLast
    };
    // Selection changed so we need to emit event
    this.selectionChange.next(this.selection);
    // To prevent side effects, we should stop propagation and prevent browser default
    event.stopPropagation();
    event.preventDefault();
  }

  // To prevent some browser issues with our selection mode, we'll catch this event and prevent browser defaults
  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    // To prevent side effects, we should stop propagation and prevent browser default
    event.stopPropagation();
    event.preventDefault();
  }
}
