import { Component, Input, Injectable, ViewChild } from '@angular/core';

import { CommentService }	from './../../shared/services/comment.service';
import { UserService }	from './../../shared/services/user.service';
import { Post, Comment }	from './../../shared/models/post';
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
	private loggedInUser: User;

	constructor(private commentService: CommentService, 
		private userService: UserService) { 
		this.loggedInUser = userService.getUser();
		this.userService.getLoggedInUserChangeEmitter().subscribe(user => {
	      this.loggedInUser = user;
	    });
	}
	
	delete(): void {
		this.commentService.delete(this.comment._id);
	}
	edit(): void {
		this.showEditCommentDiv = true;
	}
	commentEdited(comment: Comment): void {
		this.showEditCommentDiv = false;
	}
}