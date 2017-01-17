import { Injectable, OnInit }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, NavigationStart }  from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Post, Comment }   from './../models/post';

@Injectable()
export class PostService implements OnInit {
  private morePostsOnServer: boolean;
  private posts: Post[];
  private currentPost: Post;       // Set by blog-post-component.ts when user navigates
                                   // to see post.
  private headers = new Headers({'Content-Type': 'application/json'});
  private postsUrl = 'api/posts';  // URL to web api

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe( event => {
      // Clear currentPost when navigation starts
      if (event instanceof NavigationStart) {
          this.currentPost = null;
        }
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('Post service error: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
  setCurrentPost(post: Post): void {
    this.currentPost = post;
  }

  // getCurrentPost() returns promise for Post to wait for 
  // blog-post.component.ts to set currentPost when user navigates to post
  // and after the post has been received from server.
  getCurrentPost(): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
        if (this.currentPost) {
          resolve(this.currentPost);
        }
        else {
          var interval = setInterval(() =>{
              if (this.currentPost) {
                  resolve(this.currentPost);
                  clearInterval(interval);
              }
            }, 50); 
      }
    });
  }

  getPosts(): Promise<Post[]> {
    if (this.posts) return Promise.resolve(this.posts);
    return this.http.get(this.postsUrl)
       .toPromise()
       .then(response => { 
          var responsePosts = response.json() as Post[];
          this.posts = responsePosts;
          return responsePosts;
       })
       .catch(this.handleError);
  }
  isMorePostsOnServer(): boolean {
        return this.morePostsOnServer;
  };
  getPost(postId: number): Promise<Post> {
    const url = this.postsUrl + '/' + postId;
    if (this.posts && this.posts.length > 0) {
        var post = this.posts.filter(post => post._id == postId)[0];
        return Promise.resolve(this.posts.filter(post => post._id == postId)[0]);
        }
    else {
      return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
    }
  };

  create(post: Post): Promise<Post> {
    return this.http
      .post(this.postsUrl, JSON.stringify(post), {headers: this.headers})
      .toPromise()
      .then(res => {
        var resObj = res.json().data;
        var createdPost = new Post( res.json().data);
        this.posts.splice(0, 0, createdPost);
        return createdPost;
      })
      .catch(this.handleError);
  }
  update(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/${post._id}`;
    return this.http
      .put(url, JSON.stringify(post), {headers: this.headers})
      .toPromise()
      .then(() => post)
      .catch(this.handleError);
  }
  save(post: Post): Promise<Post> {
    if (post._id) {
      return this.update(post);
    }
    else 
      {
        return this.create(post);
      }
  }
  delete(id: string): Promise<void> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        if (this.posts) {
        this.posts.forEach(item => { 
          if (item._id === id) {
              this.posts.splice(this.posts.indexOf(item), 1);
            }
          });
        }
        return null;
      })
      .catch(this.handleError);
}
  deletedCommentFromInMemoryPosts(deletedCommentId: string): void {
    if (this.currentPost) {
      this.deleteCommentFromPostHelper(this.currentPost, deletedCommentId);
    }
    if (this.posts) {
      this.posts.forEach(post => {
        this.deleteCommentFromPostHelper(post, deletedCommentId);
      })
    }
  }
  deleteCommentFromPostHelper(post: Post, deletedCommentId: string) {
    if (post.comments) {
      post.comments.forEach(function(comment) {
        if (comment._id === deletedCommentId) {
          post.comments.splice(post.comments.indexOf(comment), 1);
        }
      })
    }
  }
  // Update comments for in-memory posts after comment added/modified 
  updateCommentToInMemoryPosts(comment: Comment): void {
    
    // Update currentPost
    if (this.currentPost) {
        var foundCommentInCurrentPost = this.updatePostWithComment(this.currentPost, comment);
    }
    // Update posts in posts[]
    if (this.posts) {
      this.posts.forEach(post => {
        this.updatePostWithComment(post, comment);
      });
    }
  }
  // Helper for updating comments in a post
  updatePostWithComment(post: Post, comment: Comment): void {
    if (post._id === comment.postId) {
      var foundComment = false;
      // Check comments array for existing comment to update
      if (post.comments) {
          post.comments.forEach(existingComment => {
            if (existingComment._id === comment._id) {
              post.comments.splice(post.comments.indexOf(existingComment), 1, comment);
              foundComment = true;
            }
          });
          // Comment not found in post. Add new comment to beginning.
          if (!foundComment) {
            post.comments.splice(0, 0, comment);
          }
        }
      // No comments in post. Add a new comments array with new comment.
      else {
        post.comments = [comment];
      }
    }
  }


/*
  loadMorePosts(): Promise<Post[]> {
    var defer = $q.defer();
    var topic = "find_posts";
    var requestData = {};

    if (!morePostsOnServer) {
        defer.resolve(null);
    }
    else {
        if (Model.posts && Model.posts.length > 0) {
            requestData.olderThanPostId = Model.posts[Model.posts.length - 1]._id;
        }
        
        $http({
            url: 'http://' + window.location.host + '/posts',
            params: requestData
        }
        ).then(function (response) {
            var loadedPosts = response.data;
            if (loadedPosts) {
                if (loadedPosts.length < 5) {
                    morePostsOnServer = false;
                }
           
                if (Model.posts) {
                    loadedPosts.forEach(function(post) {
                        Model.posts.push(post);
                    });
                    
                }
                else {
                    var posts = [];
                    loadedPosts.forEach(function(post) {
                        posts.push(post);
                    });
                    Model.posts = posts;
                }
            defer.resolve(loadedPosts);
        }
        else {
            morePostsOnServer = false;
        }
        });
  }
    return defer.promise;
  };

 
   


*/

