import {Directive, HostListener, Input, HostBinding, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[draggableDropZone]'
})
export class DraggableDropZone {
  // With this input we tell the draggable drop zone in what types we're interessted
  @Input() dropAcceptType;
  // If something was dropped onto the drop zone, we should emit an event
  @Output() dropDraggable = new EventEmitter();
  // The directive is adding a class to the host element if a valid draggable is moved over our drop zone
  @HostBinding('class.draggable--over') over;

  constructor() {
    // We need this counter to know if a draggable is still over our drop zone
    this.dragEnterCount = 0;
  }

  // Check if a draggable element that is interacting with our drop zone is accepter by reading the draggable-type information
  typeIsAccepted(event) {
    const draggableType = Array.from(event.dataTransfer.types).find((key) =>
      key.indexOf('draggable-type') === 0);
    return draggableType && draggableType.split(':')[1] === this.dropAcceptType;
  }

  // Handle dragover elements on the host element
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    // Only handle event if the draggable is accepted by our drop zone
    if (this.typeIsAccepted(event)) {
      // Prevent any default drag action of the browser and set the dropEffect of the DataTransfer object
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  }

  // This event will be captured if a draggable element is dropped onto our drop zone
  @HostListener('drop', ['$event'])
  onDrop(event) {
    // Only handle event if the draggable is accepted by our drop zone
    if (this.typeIsAccepted(event)) {
      // First obtain the data object that comes with the drop event
      const data = JSON.parse(event.dataTransfer.getData('application/json'));
      // After successful drop, we can reset our state and emit an event with the data
      this.over = false;
      this.dragEnterCount = 0;
      this.dropDraggable.next(data);
    }
  }

  // The dragenter event is captured when a draggable is dragged into our drop zone
  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    // Only handle event if the draggable is accepted by our drop zone
    if (this.typeIsAccepted(event)) {
      this.over = true;
      // We use this counter to determine if we loose focus because of child element or because of final leave
      this.dragEnterCount++;
    }
  }

  // The dragleave event is captured when the draggable leaves our drop zone
  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    // Using dragEnterCount, we determine if the dragleave event is because of child elements or because the draggable was moved outside the drop zone
    if (this.typeIsAccepted(event) && --this.dragEnterCount === 0) {
      this.over = false;
    }
  }
}
