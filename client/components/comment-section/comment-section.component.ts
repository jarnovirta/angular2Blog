import { Component, Input, Injectable, ViewChild } from '@angular/core';

import { Post, Comment }	from './../../shared/models/post';
import { PostService }	from './../../shared/services/post.service';
import { EditCommentComponent } from './../editComment/edit-comment.component';

@Component({
  moduleId: module.id,
  selector: 'comment-section',
  templateUrl: 'comment-section.component.html'
})

@Injectable()
export class CommentSectionComponent  {
	@Input() post: Post;
	
	@ViewChild(EditCommentComponent)
	private editCommentComponent: EditCommentComponent;

	showAddCommentDiv = false;

	commentEdited(resultPost: Post) {
		this.showAddCommentDiv = false;
	}
	addComment() {
		this.showAddCommentDiv = true;
		this.editCommentComponent.init(this.post.id);
	}	
}