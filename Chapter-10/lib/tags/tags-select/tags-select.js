import {Component, Input, ViewEncapsulation, Inject, ElementRef, Output, EventEmitter, HostBinding} from '@angular/core';
import template from './tags-select.html!text';
import {TagsService} from '../tags-service';

@Component({
  selector: 'ngc-tags-select',
  host: {
    class: 'tags-select'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class TagsSelect {
  // Filter string that is used to filter available tags
  @Input() filter;
  // This number input limits the displayed tags
  @Input() limit;
  // An input object that contains a `left` and `top` property to position the TagSelect component at the given coordinates
  @Input() position;
  // This output property will emit an event if a tag was selected within the component
  @Output() tagSelected = new EventEmitter();

  @HostBinding('style.display')
  get isVisible() {
    if (this.filter[0] === '#' && this.filteredTags.length > 0) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostBinding('style.top')
  get topPosition() {
    return this.position ? `${this.position.top}px` : 0;
  }

  @HostBinding('style.left')
  get leftPosition() {
    return this.position ? `${this.position.left}px` : 0;
  }

  constructor(@Inject(TagsService) tagsService) {
    this.tagsService = tagsService;
    // This member is storing the filtered tag list
    this.filteredTags = [];
    this.filter = '';
  }

  // If input properties have been initialized
  ngOnInit() {
    // The TagsService is providing us with all available tags within the application
    this.tagsSubscription = this.tagsService.change.subscribe((tags) => {
      // If the available tags change we store the new list and execute filtering again
      this.tags = tags;
      this.filterTags();
    });
  }

  // If a tag is clicked within the view we will emit it as selected tag
  onTagClick(tag) {
    this.tagSelected.next(tag);
  }

  // This function is filtering all available tags with the filter criteria we received as an input and limits the amount to the number we have from the limit input.
  filterTags() {
    const filter = this.filter.slice(1).toLowerCase();
    this.filteredTags = this.tags
      .filter((tag) => {
        return tag.textTag.indexOf(filter) !== -1 ||
          tag.title.toLowerCase().indexOf(filter) !== -1;
      })
      .slice(0, this.limit);
  }

  // We implement the OnChanges lifecycle hook so we can react on input changes
  ngOnChanges(changes) {
    // If the filter or the limit input changes, we're filtering the available tags again
    if (this.tags && (changes.filter || changes.limit)) {
      this.filterTags();
    }
  }

  // If this component gets destroyed, we should unsubscribe from any observable we have subscribed to
  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }
}
