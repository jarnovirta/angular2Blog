import { PageInfo }		from './../models/page-info';

export class PageInfoService {
	getPageInfo(url: string): PageInfo {
		switch (url) {
			case '/home' || '/':
				return new PageInfo('CodeGizmos.com', 
					'Coding and Arduino Blog', 
					'', 
					'Welcome to my coding and Arduino blog!', 
					'client/assets/images/home-bg.jpg');
			case '/contact':
				return new PageInfo('Contact Me', 
					'Send me an email', 
					'', 
					'You can contact me by email at jarvirta1@gmail.com.',
					'client/assets/images/contact-bg.jpg');
			case '/about':
				return new PageInfo('About Me', 
					'And my projects', 
					'', 
					'Welcome to my blog! My name is Jarno Virta.'
		        	+ ' In this blog I post about my programming and Arduino / Raspberry Pi projects. The code for the projects' 
		        	+ ' presented here can be found on GitHub.',
					'client/assets/images/about-bg.jpg');
		} 
	}
}