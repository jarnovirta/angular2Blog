export class Comment {
	_id: string;
	postId: string;
	date: Date;
	body: string;
	userName: string;

	constructor(obj?: Object) {
		var self = this;
		this.date = new Date();
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
	date: Date;
	comments: Comment[];

	constructor(obj?: Object) {
		this.date = new Date();
		var self = this;
		if (obj) { 
			Object.keys(obj).forEach(function(key) {
				self[key] = obj[key];
			});
		}
	}
}         
