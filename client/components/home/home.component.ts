import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService }	from './../../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html' 
})

export class HomeComponent  {
	loggedInUser: User;
	currentPath: string;

	constructor(private router: Router, private userService: UserService) {
		this.currentPath = this.router.url;
		if (this.currentPath == '/logout') {
			this.userService.logout();
			this.router.navigateByUrl('/home');
		}
		this.loggedInUser = this.userService.getUser();
		this.userService.getLoggedInUserChangeEmitter().subscribe(user => {
			this.loggedInUser = user;
		});
	}

}