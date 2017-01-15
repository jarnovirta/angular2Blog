class Comment {
	date: string;
	body: string;
	userName: string;
}

export class Post {
	id: number
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
