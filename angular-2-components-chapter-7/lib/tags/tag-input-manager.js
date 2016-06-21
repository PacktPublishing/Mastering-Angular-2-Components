// This function can be used to find the screen coordinates of the input cursor position
function getRangeBoundlingClientRect() {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (!range.collapsed) {
      return range.getBoundingClientRect();
    }

    const dummy = document.createElement('span');
    range.insertNode(dummy);
    const pos = dummy.getBoundingClientRect();
    dummy.parentNode.removeChild(dummy);
    return pos;
  }

  if (document.selection) {
    return document.selection
      .createRange()
      .getBoundingClientRect();
  }
}

// This class is used to handle user input where tags can be entered
export class TagInputManager {
  constructor() {
    this.reset();
  }

  reset() {
    // The textTag will store the whole tag that a user has entered including the hash symbol at the start
    this.textTag = '';
    // The position will include the current screen coordinates of the cursor where the tag was entered
    this.position = null;
  }

  // Returns true if there is any tag writing in progress
  hasTextTag() {
    return this.textTag[0] === '#';
  }

  // Internal method to be used when the writing of the tag is updated
  updateTextTag(textTag, position = this.position) {
    this.textTag = textTag;
    this.position = position;
  }

  // On keydown events we need to check for backspaces to update our text tag
  onKeyDown(event) {
    // If we receive a backspace (key code is 8), we need to remove the last character from the text tag
    if (event.which === 8 && this.hasTextTag()) {
      this.updateTextTag(this.textTag.slice(0, -1));
    }
  }

  // Handle any user input and perform the necessary logic for tag creation
  onKeyPress(event) {
    const char = String.fromCharCode(event.which);
    if (char === '#') {
      // If the current character from user input is a hash symbol we can initiate a new text tag and set the current position
      this.updateTextTag('#', getRangeBoundlingClientRect());
    } else if ((/[\w-]/i).test(this.textTag[0])) {
      // If the current character is not a valid tag character we reset our state and assume the tag entry was canceled
      this.reset();
    } else if (this.hasTextTag()) {
      // If we have any other valid tag character input, we're updating our text tag
      this.updateTextTag(this.textTag + char);
    }
  }
}
