import { Component, ViewChild, OnInit, AfterViewInit, Injectable } from '@angular/core';

import { Post }   from './../../shared/models/post';
import { PostService}  from './../../shared/services/post.service';

import { InfiniteScroll } from 'angular2-infinite-scroll';
import { EditPostComponent }  from './../editPost/editPost.component';


@Component({
  moduleId: module.id,
  selector: 'blog-post-list',
  directives: [InfiniteScroll],
  templateUrl: 'blog-post-list.component.html'
})

@Injectable()
export class BlogPostListComponent implements OnInit, AfterViewInit {
	posts: Post[];
  showAddPostDiv = false;
  newPost: Post;

  @ViewChild(EditPostComponent)
  private editPostComponent: EditPostComponent;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getPosts();
    this.newPost = new Post();

  }
  ngAfterViewInit() {
    this.editPostComponent.init(new Post());
  }

	getPosts(): void {
      this.postService.getPosts().then(posts => this.posts = posts.slice(0, 8));
	  }
  onScrollDown(): void {
    console.log("Load more posts");
  }
  addPost() {
    this.showAddPostDiv = true;
  }
  editFinished(resultPost: Post) {
    this.showAddPostDiv = false;
    if (resultPost) {
      this.getPosts() 
    }
  }
}

