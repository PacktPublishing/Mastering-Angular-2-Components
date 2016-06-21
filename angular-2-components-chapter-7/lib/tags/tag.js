// Class that represents a tag
export class Tag {
  constructor(textTag, title, link, type) {
    // The textTag property is the text representation of the tag (like #my-tag)
    this.textTag = textTag;
    this.title = title;
    this.link = link;
    this.type = type;
  }
}
