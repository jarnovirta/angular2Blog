import { Component, ViewChild, EventEmitter, Input, Output, Injectable, AfterViewInit } from '@angular/core';

import { PostService }  from './../../shared/services/post.service';
import { Post } from './../../shared/models/post';
import { SimpleTinyComponent } from './../tinymce/tinymce.component';

@Component({
  moduleId: module.id,
  selector: 'editPost',
  templateUrl: 'editPost.component.html'
})

@Injectable()
export class EditPostComponent  {
	@Output() editFinished = new EventEmitter<Promise<Post>>(); 	// true = created a new post/saved edit, 
																//false = cancelled edit
	private post: Post;

	@ViewChild(SimpleTinyComponent)
	private tinyMCEchild: SimpleTinyComponent;
	private postService: PostService;
	@Input() private fetchPostPromise: Promise<Post>;

	constructor(postService: PostService) {
		this.postService = postService;
	}
	ngAfterViewInit() {
		if (this.fetchPostPromise) this.fetchPostPromise.then(post => {
			this.tinyMCEchild.setPost(post)
			this.post = post;
		});
	}
	setPostBody(body: string) {
		this.post.body = body;

	}
	cancel() {
		this.tinyMCEchild.clearContent();
		this.post = new Post();
		this.editFinished.emit(null);
	}
	savePost() {
		this.editFinished.emit(this.postService.save(this.post));
		this.post = new Post();
		this.tinyMCEchild.clearContent();
	}
	init(post: Post) {
		this.post = post;
		this.tinyMCEchild.setPost(post);
	}
}