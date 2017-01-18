import { Injectable, EventEmitter }	from '@angular/core';
import { DatePipe }	from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Title }	from '@angular/platform-browser';

import { PostService }	from './post.service';

export class PageInfo {
	pageTitle: string;
	h1Title: string;
	h2Title: string;
	h3Title: string;
	description: string;
	headerImageUrl: string;
	currentPath: string;
	
	constructor(h1Title: string, 
		h2Title: string, 
		h3Title: string, 
		description: string, 
		headerImageUrl: string,
		currentPath: string) {
		this.pageTitle = "CodeGizmos | " + h1Title;
		this.h1Title = h1Title;
		this.h2Title = h2Title;
		this.h3Title = h3Title;
		this.description = description;
		this.headerImageUrl = headerImageUrl;
		this.currentPath = currentPath;
	}
}

@Injectable()
export class PageInfoService {
	private pageInfoChangeEmitter: EventEmitter<PageInfo>; 
	
	constructor(private router: Router, private title: Title, private postService: PostService) {
		this.pageInfoChangeEmitter = new EventEmitter<PageInfo>();
		
		// Subscribe to page info changes to change page title
		this.pageInfoChangeEmitter.subscribe(pageInfo => {
			if (pageInfo.h1Title === 'CodeGizmos.com') {
				title.setTitle("CodeGizmos | Home");
			}
			else title.setTitle("CodeGizmos | " + pageInfo.h1Title);
		});
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
				var postDatePipe = new DatePipe();
				this.postService.getCurrentPost().then(currentPost =>
						{
							this.pageInfoChangeEmitter.emit(new PageInfo(currentPost.title, 
								'', 
								'Posted on ' + postDatePipe.transform(currentPost.date, 'EEEE, d MMMM yyyy') + 
								' at ' + postDatePipe.transform(currentPost.date, 'H:m'),
								currentPost.body,
								'client/assets/images/post-bg.jpg',
								this.router.url));
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
						'client/assets/images/home-bg.jpg',
						this.router.url));
					break;
				case '/contact':
					this.pageInfoChangeEmitter.emit(new PageInfo('Contact Me', 
						'Send me an email', 
						'', 
						'You can contact me by email at jarvirta1@gmail.com.',
						'client/assets/images/contact-bg.jpg',
						this.router.url));
					break;
				case '/about':
					this.pageInfoChangeEmitter.emit(new PageInfo('About Me', 
						'And my projects', 
						'', 
						'Welcome to my blog! My name is Jarno Virta.'
			        	+ ' In this blog I post about my programming and Arduino / Raspberry Pi projects. The code for the projects' 
			        	+ ' presented here can be found on GitHub.',
						'client/assets/images/about-bg.jpg',
						this.router.url));
					break;
			}
		}
	}

}