import {Directive, HostListener, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[draggable]',
  host: {
    class: 'draggable',
    // Additionally to the class we also need to set the HTML attribute draggable to enable draggable browser behaviour
    draggable: 'true'
  }
})
export class Draggable {
  // The draggableData can be of any type and will be serialized as JSON to transfer onto drop zones. This is the data that represents the draggable.
  @Input() draggableData;
  // This string input property is used to set the type of our draggable which narrows the possible drop zone locations.
  @Input() draggableType;
  // If the draggable is dragged we're adding a CSS class for styling
  @HostBinding('class.draggable--dragging') dragging;

  // We're listening for the dragstart event and initialize the DataTransfer object
  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    // Serialize our data to JSON and set it on our DataTransfer object
    event.dataTransfer.setData('application/json', JSON.stringify(this.draggableData));
    // By adding the draggableType as a data type key within our DataTransfer object, we enable drop zones to observe the type before receiving the actual drop.
    event.dataTransfer.setData(`draggable-type:${this.draggableType}`, '');
    this.dragging = true;
  }

  // On the dragend event, we simply set our dragging flag to false.
  @HostListener('dragend')
  onDragEnd() {
    this.dragging = false;
  }
}
