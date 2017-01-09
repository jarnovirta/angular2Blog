import { Injectable, OnInit }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, NavigationStart }  from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Post }   from './../models/post';

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
/*getHeroes(): Promise<Hero[]> {
return this.http.get(this.heroesUrl)
           .toPromise()
           .then(response => response.json().data as Hero[])
           .catch(this.handleError);
}

getHero(id: number): Promise<Hero> {
const url = `${this.heroesUrl}/${id}`;
return this.http.get(url)
  .toPromise()
  .then(response => response.json().data as Hero)
  .catch(this.handleError);
}

delete(id: number): Promise<void> {
const url = `${this.heroesUrl}/${id}`;
return this.http.delete(url, {headers: this.headers})
  .toPromise()
  .then(() => null)
  .catch(this.handleError);
}

create(name: string): Promise<Hero> {
return this.http
  .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
  .toPromise()
  .then(res => res.json().data)
  .catch(this.handleError);
}

update(hero: Hero): Promise<Hero> {
const url = `${this.heroesUrl}/${hero.id}`;
return this.http
  .put(url, JSON.stringify(hero), {headers: this.headers})
  .toPromise()
  .then(() => hero)
  .catch(this.handleError);
}
*/

