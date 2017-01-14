import { Component, OnInit, Injectable } from '@angular/core';

import { Post }   from './../../shared/models/post';
import { PostService}  from './../../shared/services/post.service';

import { InfiniteScroll } from 'angular2-infinite-scroll';


@Component({
  moduleId: module.id,
  selector: 'blog-post-list',
  directives: [InfiniteScroll],
  templateUrl: 'blog-post-list.component.html'
})

@Injectable()
export class BlogPostListComponent implements OnInit {
	posts: Post[];
  showAddPostDiv = false;
  newPost: Post;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getPosts();
    this.newPost = new Post();

  }
	getPosts(): void {
	    this.postService.getPosts().then(posts => this.posts = posts.slice(0, 8));
	  }
  onScrollDown(): void {
    console.log("Load more posts");
  }
  setShowAddPostDiv(show: boolean) {
    this.showAddPostDiv = show;
  }
}

