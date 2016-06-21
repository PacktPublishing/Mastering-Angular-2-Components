import {Injectable, Inject} from '@angular/core';
import {ReplaySubject} from 'rxjs/Rx';
import {ProjectService} from '../project/project-service/project-service';
import {Tag} from './tag';
import {generateTag, TAG_TYPE_TASK} from './generate-tag';

// Utility function to replace all text occurrences in a string
function replaceAll(target, search, replacement) {
  return target.split(search).join(replacement);
}

// Function to find any tags within a string and return an array of discovered tags
function findTags(str) {
  const result = [];
  const regex = /#[\w\/-]+/g;
  let match;
  while (match = regex.exec(str)) {
    result.push(match[0]);
  }
  return result;
}

@Injectable()
export class TagsService {
  constructor(@Inject(ProjectService) projectService) {
    // If the available tags within the system changes, we will emit this event
    this.change = new ReplaySubject(1);
    // In order to generate project tags, we're making use of the ProjectService
    this.projectService = projectService;
    this.projectService.change.subscribe((projects) => {
      // On project changes we store the new project list and re-initialize our tags
      this.projects = projects;
      this.initializeTags();
    });
  }

  // This method is used internally to initialize all available tags
  initializeTags() {
    // We're creating tags from all projects using the generateTag function
    this.tags = this.projects.map(generateTag);
    // Let's also create task tags
    this.projects.forEach((project) => {
      this.tags = this.tags.concat(project.tasks.map((task) => {
        return {
          type: TAG_TYPE_TASK,
          project,
          task
        };
      }).map(generateTag));
    });
    // Since we've updated the list of available tags we need to emit a change event
    this.change.next(this.tags);
  }

  // The render tag method can be used to generate an HTML representation of a tag
  renderTag(tag) {
    if (tag instanceof Tag) {
      return `<a class="tags__tag tags__tag--${tag.type}" href="${tag.link}">${tag.title}</a>`;
    } else {
      return tag;
    }
  }

  // This method will lookup a tag via its text representation or return the input argument if not found
  parseTag(textTag) {
    return this.tags.find((tag) => tag.textTag === textTag) || textTag;
  }

  // This method takes some text input and replaces any found and valid text representations of tags with the generated HTML representation of those tags
  parse(value) {
    // First we find all possible tags within the text
    const tags = findTags(value);
    // For each found text tag, we're parsing and rendering them while replacing the text tag with the HTML representation if applicable
    tags.forEach((tag) => value = replaceAll(value, tag, this.renderTag(this.parseTag(tag))));
    return value
  }
}
