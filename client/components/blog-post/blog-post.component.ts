import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Post }	from './../../shared/models/post';
import { PostService } from './../../shared/services/post.service';

@Component({
  moduleId: module.id,
  selector: 'blog-post',
  templateUrl: 'blog-post.component.html'
})

export class BlogPostComponent implements OnInit {
	post: Post;
	fetchPostPromise: Promise<Post>;

	constructor(private postService: PostService, private route: ActivatedRoute) {};
	ngOnInit() {
		this.fetchPostPromise = this.postService.getPost(this.route.snapshot.params['id']);
		this.fetchPostPromise.then(post => {
			this.post = post;
			this.postService.setCurrentPost(this.post);
		}); 
	}
	getCurrentBlogPost(): Promise<Number> {
		if (this.post) return Promise.resolve(this.post._id);
		else return this.fetchPostPromise.then(post => post._id);
	}	
}