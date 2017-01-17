import { Component, Injectable } from '@angular/core';

import { UserService }	from './../../shared/services/user.service';
import { User }	from './../../shared/models/user';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login-form.component.html'
})

@Injectable()
export class LoginFormComponent {
	user;
	loggedInUser;

	constructor(private userService: UserService) {
		this.user = new User();
		this.loggedInUser = this.userService.getUser();

	}

	onSubmit() {
		console.log(this.user);
		this.userService.login(this.user);
	}
}