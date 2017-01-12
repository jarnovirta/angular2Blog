import { Component, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html' 
})

export class HomeComponent  {
	@Input() test: string;
	pageInfo = {
		'title': 'CodeGizmos.com',
		'subTitle': 'Coding and Arduino Blog',
		'description': 'Welcome to my coding and Arduino blog!'
		};
	tinyMCE(elementContent:string) {
		console.log(elementContent);
	}
}