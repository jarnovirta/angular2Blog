import { Component, OnInit, AfterViewInit, Injectable, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Post }	from './../../shared/models/post';
import { PostService } from './../../shared/services/post.service';
import { EditPostComponent }	from './../editPost/editPost.component';
import { PageInfoService }	from './../../shared/services/page-info.service';

@Component({
  moduleId: module.id,
  selector: 'blog-post',
  templateUrl: 'blog-post.component.html'
})

export class BlogPostComponent implements OnInit, AfterViewInit {
	private post: Post;
	fetchPostPromise: Promise<Post>;
	showEditPostDiv = false;

	@ViewChild(EditPostComponent)
	private editPostComponent: EditPostComponent;

	constructor(private router: Router, 
		private route: ActivatedRoute,
		private postService: PostService,
		private pageInfoService: PageInfoService) {};
	ngOnInit() {
		this.fetchPostPromise = this.postService.getPost(this.route.snapshot.params['id']);
		this.fetchPostPromise.then(post => {
			this.post = post;
			this.postService.setCurrentPost(this.post);
		}); 
	}
	ngAfterViewInit() {
		this.fetchPostPromise.then(post => {
			this.editPostComponent.init(this.post);
		});
	}
	getCurrentBlogPost(): Promise<Number> {
		if (this.post) return Promise.resolve(this.post.id);
		else return this.fetchPostPromise.then(post => post.id);
	}
	editPost() {
		this.showEditPostDiv = true;
		this.editPostComponent.init(this.post);

	}
	deletePost() {
		this.postService.delete(this.post.id).then(() => {
			this.router.navigate(['/']);
		});
	}
	editFinished(result: Promise<Post>) {
	    this.showEditPostDiv = false;
	    if (result) {
	      result.then(editedPost => {
	      	this.post = editedPost;
	      	this.pageInfoService.refreshPageInfo();	      	
	      });
    }
  }	
}