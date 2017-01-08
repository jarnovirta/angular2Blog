class Comment {
	date: string;
	body: string;
	userName: string;
}

export class Post {
	_id: number;
	name: string;
	title: string;
	body: string;
	date: string;
	comments: Comment[];

}         
