import { Router }	from '@angular/router';
import { Component, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html' 
})

export class HomeComponent  {
	currentPath: string;

	constructor(private router: Router) {
		this.currentPath = router.url;
		console.log("current path " + this.currentPath);
	}

	tinyMCE(elementContent:string) {
		console.log(elementContent);
	}
}