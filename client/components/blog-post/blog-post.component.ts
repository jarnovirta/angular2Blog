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

	constructor(
		private postService: PostService,
		private route: ActivatedRoute) {};
	ngOnInit() {
		this.route.params
	      .switchMap((params: Params) => this.postService.getPost(+params['id']))
	      .subscribe(post => this.post = post);
	}
	
}