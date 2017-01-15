import { Component, Input, Output, Injectable, EventEmitter } from '@angular/core';

import { Post, Comment }	from './../../shared/models/post';
import { PostService }	from './../../shared/services/post.service';

@Component({
  moduleId: module.id,
  selector: 'edit-comment',
  templateUrl: 'edit-comment.component.html'
})

@Injectable()
export class EditCommentComponent  {
	@Input() comment: Comment;
	@Output() editFinished = new EventEmitter<Comment>();

	constructor(private postService: PostService) {
		this.comment = new Comment();
	}

	cancel() {
		this.editFinished.emit(null);
	}
	onSubmit() {
		this.postService.saveComment(this.comment).then(savedComment => {
			this.editFinished.emit(savedComment);
		});
	}
	init(postId: number) {
		this.comment = new Comment();
		this.comment.postId = postId;
	}
}