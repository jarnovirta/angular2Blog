import { Component, Injectable } from '@angular/core';
import { Router }	from '@angular/router';

import { UserService }	from './../../shared/services/user.service';
import { PageInfoService }	from './../../shared/services/page-info.service';
import { User }	from './../../shared/models/user';

@Component({
  moduleId: module.id,
  selector: 'login-logout',
  templateUrl: 'login-logout.component.html'
})

@Injectable()
export class LoginLogoutComponent {
	loginFormUser: User;
	loggedInUser: User;
	currentPath;

	constructor(private router: Router, private userService: UserService, 
		private pageInfoService: PageInfoService) {
		this.loginFormUser = new User();
		this.loggedInUser = userService.getUser();
		this.userService.getLoggedInUserChangeEmitter().subscribe(user => {
			this.loggedInUser = user;			
		});
		this.currentPath = this.router.url;
		this.pageInfoService.getPageInfoChangeEmitter().subscribe(pageInfo => {
			this.currentPath = pageInfo.currentPath;

		});
		
	}
	onSubmit() {
		this.userService.login(this.loginFormUser);
		this.loginFormUser = new User();
		this.router.navigateByUrl('/home');
	}
	logout() {
		this.userService.logout();
	}
}
	
