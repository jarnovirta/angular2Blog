import { Injectable }	from '@angular/core';
import { PageInfo }		from './../models/page-info';
import { PostService }	from './post.service';
import { Post }	from './../models/post';

@Injectable()
export class PageInfoService {
	constructor(private postService: PostService) {};

	getPageInfo(url: string): Promise<PageInfo> {
		if (url.substr(0, 7) == '/posts/' && url.length > 7) {
			var promise = new Promise<PageInfo>((resolve, reject) => {
				this.postService.getCurrentPost().then(currentPost =>
						{
							resolve(new PageInfo(currentPost.title, 
								'', 
								'Posted on ' + currentPost.date + ' TEE FILTTERI',
								currentPost.body,
								'client/assets/images/post-bg.jpg'));
						}
					)
			})
			return promise;
		}
		else {
			switch (url) {
				case '/home':
				case '/':
					return Promise.resolve(new PageInfo('CodeGizmos.com', 
						'Coding and Arduino Blog', 
						'', 
						'Welcome to my coding and Arduino blog!', 
						'client/assets/images/home-bg.jpg'));
				case '/contact':
					return Promise.resolve(new PageInfo('Contact Me', 
						'Send me an email', 
						'', 
						'You can contact me by email at jarvirta1@gmail.com.',
						'client/assets/images/contact-bg.jpg'));
				case '/about':
					return Promise.resolve(new PageInfo('About Me', 
						'And my projects', 
						'', 
						'Welcome to my blog! My name is Jarno Virta.'
			        	+ ' In this blog I post about my programming and Arduino / Raspberry Pi projects. The code for the projects' 
			        	+ ' presented here can be found on GitHub.',
						'client/assets/images/about-bg.jpg'));
			}
		} 
	}
}