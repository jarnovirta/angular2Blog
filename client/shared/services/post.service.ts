import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post }   from './../models/post';

@Injectable()
export class PostService {

  private posts: Post[];
  private headers = new Headers({'Content-Type': 'application/json'});
  private postsUrl = 'api/posts';  // URL to web api

  constructor(private http: Http) { }

  getPosts(): Promise<Post[]> {
    if (this.posts) return Promise.resolve(this.posts);
    else {
      var postListPromise = this.http.get(this.postsUrl)
               .toPromise().then
    }

    return this.http.get(this.postsUrl)
               .toPromise()
               .then(response => { 
                  console.log("LOADED POSTS");
                  var responsePosts = response.json().data as Post[];
                  this.posts = responsePosts;
                  return responsePosts;
               })
               .catch(this.handleError);
  }

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
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
}
