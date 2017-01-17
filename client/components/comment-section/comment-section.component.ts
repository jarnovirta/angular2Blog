import { Component, Input, Injectable, ViewChild } from '@angular/core';

import { Post, Comment }	from './../../shared/models/post';
import { PostService }	from './../../shared/services/post.service';
import { CommentFormComponent } from './../comment-form/comment-form.component';

@Component({
  moduleId: module.id,
  selector: 'comment-section',
  templateUrl: 'comment-section.component.html'
})

@Injectable()
export class CommentSectionComponent  {
	@Input() post: Post;
	
	@ViewChild(CommentFormComponent)
	private commentFormComponent: CommentFormComponent;

	showAddCommentDiv = false;

	commentEdited(resultPost: Post) {
		this.showAddCommentDiv = false;
	}
	addComment() {
		this.showAddCommentDiv = true;
		this.commentFormComponent.init(this.post._id);
	}	
}