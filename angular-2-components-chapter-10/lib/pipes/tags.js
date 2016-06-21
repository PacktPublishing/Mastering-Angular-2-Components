import {Pipe, Inject} from '@angular/core';
import {TagsService} from '../tags/tags-service';

@Pipe({
  name: 'tags',
  // Since our pipe is depending on services, we're dealing with a stateful pipe and therefore set the pure flag to false
  pure: false
})
export class TagsPipe {
  constructor(@Inject(TagsService) tagsService) {
    this.tagsService = tagsService;
  }

  // The transform method will be called when the pipe is used within a template
  transform(value) {
    if (typeof value !== 'string') {
      return value;
    }
    // The pipe is using the TagsService to parse the entire text
    return this.tagsService.parse(value);
  }
}
