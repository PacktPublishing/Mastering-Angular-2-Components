import {Component, Inject, Input, Output, ViewEncapsulation, ViewChild, EventEmitter} from '@angular/core';
import template from './comments.html!text';
import {Editor} from '../ui/editor/editor';
import {Comment} from './comment/comment';
import {UserService} from '../user/user-service/user-service';
import {ActivityService} from '../activities/activity-service/activity-service';
import {limitWithEllipsis} from '../utilities/string-utilities';

@Component({
  selector: 'ngc-comments',
  host: {
    class: 'comments'
  },
  template,
  encapsulation: ViewEncapsulation.None,
  directives: [Comment, Editor]
})
export class Comments {
  // A list of comment objects
  @Input() comments;
  // Subject for logging activities
  @Input() activitySubject;
  // Event when the list of comments have been updated
  @Output() commentsUpdated = new EventEmitter();
  // We are using an editor for adding new comments and control it directly using a reference
  @ViewChild(Editor) newCommentEditor;

  // We're using the user service to obtain the currently logged in user
  constructor(@Inject(UserService) userService, @Inject(ActivityService) activityService) {
    this.userService = userService;
    this.activityService = activityService;
  }

  // We use input change tracking to prevent dealing with undefined comment list
  ngOnChanges(changes) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  // Adding a new comment from the newCommentContent field that is bound to the editor content
  addNewComment() {
    const comments = this.comments.slice();
    const content = this.newCommentEditor.getEditableContent();
    comments.splice(0, 0, {
      user: this.userService.currentUser,
      time: +new Date(),
      content
    });
    // Emit event so the updated comment list can be persisted outside the component
    this.commentsUpdated.next(comments);
    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
    // Creating an activity log for the added comment
    this.activityService.logActivity(
      this.activitySubject.id,
      'comments',
      'New comment was added',
      `A new comment "${limitWithEllipsis(content, 30)}" was added to #${this.activitySubject.document.data._id}.`
    );
  }

  // This method deals with edited comments
  onCommentEdited(comment, content) {
    const comments = this.comments.slice();
    // If the comment was edited with e zero length content, we will delete the comment from the list
    if (content.length === 0) {
      const removed = comments.splice(comments.indexOf(comment), 1)[0];
      // Creating an activity log for the deleted comment
      this.activityService.logActivity(
        this.activitySubject.id,
        'comments',
        'Comment deleted',
        `The comment "${limitWithEllipsis(removed.content, 30)}" on #${this.activitySubject.document.data._id} was deleted.`
      );
    } else {
      // Otherwise we're replacing the existing comment
      const oldComment = comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      })[0];
      // Creating an activity log for the modified comment
      this.activityService.logActivity(
        this.activitySubject.id,
        'comments',
        'Comment edited',
        `The comment "${limitWithEllipsis(oldComment.content, 30)}" on #${this.activitySubject.document.data._id} was edited.`
      );
    }
    // Emit event so the updated comment list can be persisted outside the component
    this.commentsUpdated.next(comments);
  }

  isNewCommentEmpty() {
    return this.newCommentEditor ? this.newCommentEditor.getEditableContent().length === 0 : true;
  }

  hasComments() {
    return this.comments && this.comments.length > 0;
  }
}
