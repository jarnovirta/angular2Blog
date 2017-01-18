import { Component, ViewChild, EventEmitter, Input, Output, Injectable } from '@angular/core';

import { PostService }  from './../../shared/services/post.service';
import { Post } from './../../shared/models/post';
import { SimpleTinyComponent } from './../tinymce/tinymce.component';

@Component({
  moduleId: module.id,
  selector: 'edit-post',
  templateUrl: 'edit-post.component.html'
})

@Injectable()
export class EditPostComponent {
	@Output() editFinished = new EventEmitter<Post>(); 	// true = created a new post/saved edit, 
																//false = cancelled edit
	private editPost: Post;

	@ViewChild(SimpleTinyComponent)
	private tinyMCEchild: SimpleTinyComponent;
	private postService: PostService;
	@Input() private fetchPostPromise: Promise<Post>;

	constructor(postService: PostService) {
		this.postService = postService;
	}

	setPostBody(body: string) {
		this.editPost.body = body;

	}
	cancel() {
		this.tinyMCEchild.clearContent();
		this.editPost = new Post();
		this.editFinished.emit(null);
	}
	save() {
		console.log("Saving");
		this.postService.save(this.editPost).then(savedPost => {
			console.log("Saved");
			this.editPost = new Post();
			this.tinyMCEchild.clearContent();
			this.editFinished.emit(savedPost);
		});
	}
	init(post: Post) {
		this.editPost = new Post(post);
		this.tinyMCEchild.setPost(this.editPost);
	}
}