import { Component } from '@angular/core';
import  { Observable } 	from 'rxjs/Rx';
import { Router, NavigationStart } from '@angular/router';
import { PageInfoService }  from './../../shared/services/page-info.service';
import { PageInfo }	from './../../shared/models/page-info';

@Component({
  moduleId: module.id,
  selector: 'page-header',
  templateUrl: 'page-header.component.html',
  providers: [PageInfoService] 
})

export class PageHeaderComponent  {
	pageInfo: PageInfo;
	constructor(private router: Router, private pageInfoService: PageInfoService) {	}
  	ngOnInit(): void {
  		this.router.events.subscribe( event => {
  			if (event instanceof NavigationStart) {
  				this.pageInfo = this.pageInfoService.getPageInfo(event.url);
  			}
  		});
  	}
}
