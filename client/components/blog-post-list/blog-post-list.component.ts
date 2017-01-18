import { Component, ViewChild, OnInit, AfterViewInit, Injectable } from '@angular/core';

import { InfiniteScroll } from 'angular2-infinite-scroll';

import { Post }   from './../../shared/models/post';
import { PostService }  from './../../shared/services/post.service';
import { UserService }  from './../../shared/services/user.service';
import { EditPostComponent }  from './../editPost/edit-post.component';

@Component({
  moduleId: module.id,
  selector: 'blog-post-list',
  directives: [InfiniteScroll],
  templateUrl: 'blog-post-list.component.html'
})

@Injectable()
export class BlogPostListComponent implements OnInit, AfterViewInit {
	posts: Post[];
  showAddPostDiv: boolean;
  newPost: Post;
  loggedInUser: User;

  @ViewChild(EditPostComponent)
  private editPostComponent: EditPostComponent;

  constructor(private postService: PostService, private userService: UserService) {
    this.showAddPostDiv = false;
    this.loggedInUser = userService.getUser();
    this.userService.getLoggedInUserChangeEmitter().subscribe(user => {
      this.loggedInUser = user;
    });
    this.newPost = new Post();
  }
  ngOnInit(): void {
    this.getPosts();
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

