import { Injectable }	from '@angular/core';
import { Headers, Http } from '@angular/http';

import { PostService }	from './post.service';
import { Comment }   from './../models/post';

@Injectable()
export class CommentService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private commentsUrl = 'api/comments';  // URL to web api
	// REMOVE WHEN SERVER CODE DONE
	private tempCommentIDCounter = 10;

	constructor(private http: Http, private postService: PostService) {}

	private handleError(error: any): Promise<any> {
		console.error('Post service error: ', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	} 
	create(comment: Comment): Promise<Comment> {
	        // REMOVE WHEN SERVER CODE DONE:
	    comment.id = this.tempCommentIDCounter++;
	    //
	return this.http
	  .post(this.commentsUrl, JSON.stringify(comment), {headers: this.headers})
	  .toPromise()
	  .then(res => {
	    var savedComment = new Comment(res.json().data);
	    this.postService.updatePostComments(savedComment);
	    
	    // REMOVE WHEN SERVER CODE DONE:
	    this.postService.commentDBPersistREMOVE_WHEN_SERVER_DONE();

	    return savedComment;
	  })
	  .catch(this.handleError);
	}
	update(comment: Comment): Promise<Comment> {
	const commentUpdateUrl = this.commentsUrl + '/' + comment.id;
	return this.http
	  .put(commentUpdateUrl, JSON.stringify(comment), {headers: this.headers})
	  .toPromise()
	  .then(() => {
	    this.postService.updatePostComments(comment);
	    this.postService.commentDBPersistREMOVE_WHEN_SERVER_DONE();
	    return comment;
	  })
	  .catch(this.handleError);
	}

	save(comment: Comment): Promise<Comment> {
	if (comment.id) return this.update(comment);
	else return this.create(comment);
	}

	delete(id: number): Promise<void> {
	const url = `${this.commentsUrl}/${id}`;
	return this.http.delete(url, {headers: this.headers})
	  .toPromise()
	  .then(() => {
	    this.postService.removeDeletedCommentFromPosts(id);
	    this.postService.commentDBPersistREMOVE_WHEN_SERVER_DONE();
	    return null;
	  })
	  .catch(this.handleError);
	} 
}