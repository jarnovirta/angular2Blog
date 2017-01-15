import { Component, Input, Injectable, ViewChild } from '@angular/core';

import { Post, Comment }	from './../../shared/models/post';
import { PostService }	from './../../shared/services/post.service';
import { EditCommentComponent } from './../editComment/edit-comment.component';

@Component({
  moduleId: module.id,
  selector: 'comment',
  templateUrl: 'comment.component.html'
})

@Injectable()
export class CommentComponent  {
	@Input() comment: Comment;
	
}