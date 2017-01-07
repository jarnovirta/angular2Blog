import { Component, OnInit } from '@angular/core';

import { Post }   from './models/post';
import { PostService}  from './services/post.service';

@Component({
  moduleId: module.id,
  selector: 'blog-post-list',
  templateUrl: 'blog-post-list.component.html',
  providers: [ PostService] 
})

export class BlogPostListComponent implements OnInit {
	posts: Post[];

  constructor(private postService: PostService) {}
	getPosts(): void {
	    this.postService.getPosts().then(posts => this.posts = posts);
	  }
  	ngOnInit(): void {
    	this.getPosts();
  	}
}

