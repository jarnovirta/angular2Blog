export class Comment {
	_id: string;
	postId: string;
	date: string;
	body: string;
	userName: string;

	constructor(obj?: Object) {
		var self = this;
		if (obj) { 
			Object.keys(obj).forEach(function(key) {
				self[key] = obj[key];
			});
		}
	}
}
export class Post {
	_id: string;
	name: string;
	title: string;
	body: string;
	date: string;
	comments: Comment[];

	constructor(obj?: Object) {
		var self = this;
		if (obj) { 
			Object.keys(obj).forEach(function(key) {
				self[key] = obj[key];
			});
		}
	}
}         
