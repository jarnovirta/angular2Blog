import { Component }          from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'angular2blog',
  template: `
	  <h1>{{title}}</h1>
	  
	`,
  
})
export class AppComponent {
  title = 'CodeGizmos blog!';
}
