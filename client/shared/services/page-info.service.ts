import { Injectable, EventEmitter }	from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PageInfo }		from './../models/page-info';

import { PostService }	from './post.service';
import { Post }	from './../models/post';

@Injectable()
export class PageInfoService {
	private pageInfoChangeEmitter: EventEmitter<PageInfo>; 
	
	constructor(private router: Router, private postService: PostService) {
		this.pageInfoChangeEmitter = new EventEmitter<PageInfo>();
		
		// Subscribe to url changes for emitting refreshed PageInfo 
		// (for page header title change etc. when navigating)
		this.router.events.subscribe(event => {
  			if (event instanceof NavigationEnd) {
  				this.refreshPageInfo();
  			} 
  		});
	};

	getPageInfoChangeEmitter(): EventEmitter<PageInfo> {
		setTimeout(() => { this.refreshPageInfo() }, 10);
		return this.pageInfoChangeEmitter;
	}
	// Emit new pageInfoChange event with PageInfo object.
	refreshPageInfo(): void {
		var url = this.router.url;
		if (url.substr(0, 7) == '/posts/' && url.length > 7) {
				this.postService.getCurrentPost().then(currentPost =>
						{
							this.pageInfoChangeEmitter.emit(new PageInfo(currentPost.title, 
								'', 
								'Posted on ' + currentPost.date + ' TEE FILTTERI',
								currentPost.body,
								'client/assets/images/post-bg.jpg'));
						});
		}
		else {
			switch (url) {
				case '/home':
				case '/':
				case '/login':
					this.pageInfoChangeEmitter.emit(new PageInfo('CodeGizmos.com', 
						'Coding and Arduino Blog', 
						'', 
						'Welcome to my coding and Arduino blog!', 
						'client/assets/images/home-bg.jpg'));
					break;
				case '/contact':
					this.pageInfoChangeEmitter.emit(new PageInfo('Contact Me', 
						'Send me an email', 
						'', 
						'You can contact me by email at jarvirta1@gmail.com.',
						'client/assets/images/contact-bg.jpg'));
					break;
				case '/about':
					this.pageInfoChangeEmitter.emit(new PageInfo('About Me', 
						'And my projects', 
						'', 
						'Welcome to my blog! My name is Jarno Virta.'
			        	+ ' In this blog I post about my programming and Arduino / Raspberry Pi projects. The code for the projects' 
			        	+ ' presented here can be found on GitHub.',
						'client/assets/images/about-bg.jpg'));
					break;
			}
		}
	}
}