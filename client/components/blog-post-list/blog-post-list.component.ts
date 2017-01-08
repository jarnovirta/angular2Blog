import { Component, OnInit, Injectable } from '@angular/core';

import { Post }   from './../../shared/models/post';
import { PostService}  from './../../shared/services/post.service';

@Component({
  moduleId: module.id,
  selector: 'blog-post-list',
  templateUrl: 'blog-post-list.component.html'
})

@Injectable()
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

