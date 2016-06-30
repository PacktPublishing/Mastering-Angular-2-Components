import {Tag} from './tag';
import {limitWithEllipsis} from '../utilities/string-utilities';
export const TAG_TYPE_PROJECT = 'project';

// The generateTag function is responsible for generating new tag objects depending on the passed subject
export function generateTag(subject) {
  if (subject.type === TAG_TYPE_PROJECT) {
    // If we're dealing with a project here, we generate the according tag object
    const openTaskCount = subject.tasks.filter((task) => !task.done).length;
    return new Tag(
      `#${subject._id}`,
      `${limitWithEllipsis(subject.title, 20)} (${openTaskCount} open tasks)`,
      `#/projects/${subject._id}/tasks`,
      TAG_TYPE_PROJECT
    );
  }
}
