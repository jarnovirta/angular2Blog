import { Component } from '@angular/core';

import { UserService }	from './../../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html' 
})

export class NavBarComponent  {
	private loggedInUser: User;

	constructor(private userService: UserService) {
		this.loggedInUser = this.userService.getUser();
		this.userService.getLoggedInUserChangeEmitter().subscribe(user => {
			this.loggedInUser = user;
	}
}