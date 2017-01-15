import { Component, Input, Injectable, ViewChild } from '@angular/core';

import { Post, Comment }	from './../../shared/models/post';
import { CommentService }	from './../../shared/services/comment.service';
import { EditCommentComponent } from './../editComment/edit-comment.component';

@Component({
  moduleId: module.id,
  selector: 'comment',
  templateUrl: 'comment.component.html'
})

@Injectable()
export class CommentComponent  {
	@Input() comment: Comment;
	private showEditCommentDiv = false;

	constructor(private commentService: CommentService) { }
	
	delete(): void {
		this.commentService.delete(this.comment.id);
	}
	edit(): void {
		this.showEditCommentDiv = true;
	}
	commentEdited(comment: Comment): void {
		this.showEditCommentDiv = false;
	}
}