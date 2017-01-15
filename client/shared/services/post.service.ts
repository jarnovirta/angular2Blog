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
  private commentsUrl = 'api/comments';  // URL to web api

  // REMOVE WHEN SERVER CODE DONE
  private tempCommentIDCounter = 10;

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
          var responsePosts = response.json().data as Post[];
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
        var post = this.posts.filter(post => post.id == postId)[0];
        return Promise.resolve(this.posts.filter(post => post.id == postId)[0]);
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
    const url = `${this.postsUrl}/${post.id}`;
    return this.http
      .put(url, JSON.stringify(post), {headers: this.headers})
      .toPromise()
      .then(() => post)
      .catch(this.handleError);
  }
  save(post: Post): Promise<Post> {
    if (post.id) {
      return this.update(post);
    }
    else 
      {
        return this.create(post);
      }
  }
  delete(id: number): Promise<void> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        if (this.posts) {
        this.posts.forEach(item => { 
          if (item.id === id) {
              this.posts.splice(this.posts.indexOf(item), 1);
            }
          });
        }
        return null;
      })
      .catch(this.handleError);
}
  
  
  createComment(comment: Comment): Promise<Comment> {
    console.log("*** CREATING COMMENT");

    return this.http
      .post(this.commentsUrl, JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then(res => {
        var savedComment = new Comment(res.json().data);
        // REMOVE WHEN SERVER CODE DONE:
        savedComment.id = this.tempCommentIDCounter++;
        //
        this.updatePostComments(savedComment);
        
        // REMOVE WHEN SERVER CODE DONE:
        this.commentDBPersistREMOVE_WHEN_SERVER_DONE();
        console.log("createComment() returning comment: ");
        console.dir(savedComment);
        return savedComment;
      })
      .catch(this.handleError);
  }
  updateComment(comment: Comment): Promise<Comment> {
    console.log("UPDATE COMMENT:");
    console.dir(comment);
    return this.http
      .put(this.commentsUrl, JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then(res => {
        var comment = res.json().data;
        console.log("Saved comment: " + comment);
        this.updatePostComments(comment);
        this.commentDBPersistREMOVE_WHEN_SERVER_DONE();
        return comment;

      })
      .catch(this.handleError);
  }

  saveComment(comment: Comment): Promise<Comment> {
    if (comment.id) return this.updateComment(comment);
    else return this.createComment(comment);
  }
  
  // Update comments for in-memory posts after comment added/modified 
  updatePostComments(comment: Comment): Post {
    console.log("updatePostComments() called for comment. ");
    console.dir(comment);

    // Update current post
    
    if (this.currentPost && this.currentPost.id === comment.postId) {
        if (this.updateExistingCommentsInPostHelper(this.currentPost, comment)) {
           console.log("updateExistingComments returned with found comment");
          return this.currentPost;
        }
        if (!this.currentPost.comments) this.currentPost.comments = [];
        this.currentPost.comments.splice(0, 0, comment);
        console.log("Added new comment to current post comments start");
        return this.currentPost;
      }
    // Update posts in posts[]
    else {
        var updatedPost: Post;
        if (this.posts) {
          this.posts.forEach(post => {
            if (post.id === comment.postId) {
              if (this.updateExistingCommentsInPostHelper(post, comment)) return post;
              if (!post.comments) post.comments = [];
              post.comments.splice(0, 0, comment);
              return post;
            }
          });

        }
    }
  }
    // UPDATE POSTS WITH COMMENT AND SAVE
    // REMOVE AFTER SERVER CODE DONE:
  commentDBPersistREMOVE_WHEN_SERVER_DONE() {
    
    if (this.posts) {
      this.posts.forEach(post => {
        this.save(post);
      });
    }
     //
    if (this.currentPost) this.save(this.currentPost);
  }

  // Helper for updating comments in a post
  updateExistingCommentsInPostHelper(post: Post, comment: Comment) {
    if (post.comments) {
      post.comments.forEach(existingComment => {
        if (existingComment.id === comment.id) {
          existingComment = comment;
          return true;
        }
      })
    }
    return false;
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

    this.query = function() {
      var defer = $q.defer();
        if (Model.posts) {
            defer.resolve(Model.posts);
            }
            else {
                    var topic = 'find_posts';
                    Websocket.send(topic).then(function (posts) {
                        Model.posts = posts;

                        defer.resolve(posts);

                    });
            }
        
       return defer.promise;
    };

    this.create = function(post) {
        Websocket.send("new_post", post).then(function (createdPost) {
            if (Model.posts) {
                Model.posts.unshift(createdPost);
            }
            else {
                Model.posts = [createdPost];
                }
            
        });
    };

    this.save = function(post) {
      Websocket.send('update_post', post).then(function (updatedPost) {
            
            var oldPost = _.find(Model.posts, function (oldPost) {
                    return oldPost._id === updatedPost._id;
                });
                if (!oldPost && Model.posts) { 
                    Model.posts.unshift(updatedPost);
                }
                
        });
    };

    this.remove = function(postToRemove) {
       Websocket.send('delete_post', postToRemove._id).then(function () {
            _.remove(Model.posts, function(post) {
                return post._id === postToRemove._id;
            });
        });
                  
    };
    this.WebsocketNewPost = function(postToAdd) {
        if (Model.posts) {
            var oldPost = _.find(Model.posts, function (oldPost) {
                return oldPost._id === postToAdd._id;
            });
            if (!oldPost) {
                Model.posts.unshift(postToAdd);
                Sound.alert();
            }
        }
    };           
    this.WebsocketDeletePost = function(postIdToDelete) {
        _.remove(Model.posts, function(post) {
            return post._id === postIdToDelete;
        });
        
    };
    this.WebsocketUpdatePost = function(updatePost) {
        var postToUpdate = _.find(Model.posts, function(post) {
                        return post._id === updatePost._id;
                   });
        if (Model.posts) {
            Model.posts[Model.posts.indexOf(postToUpdate)] = updatePost;

        }
    };
}]);


*/

