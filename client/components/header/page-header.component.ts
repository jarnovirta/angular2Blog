import { Component }  from '@angular/core';
import { Observable } 	from 'rxjs/Rx';
import { Router, NavigationStart }  from '@angular/router';

import { PageInfoService, PageInfo }  from './../../shared/services/page-info.service';
import { UserService }  from './../../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'page-header',
  templateUrl: 'page-header.component.html'
 
})

export class PageHeaderComponent  {
	pageInfo: PageInfo;
  
	constructor(private router: Router, private pageInfoService: PageInfoService, 
      private userService: UserService) {	}

  	ngOnInit(): void {
        this.pageInfoService.getPageInfoChangeEmitter().subscribe(pageInfo => {
          this.pageInfo = pageInfo;
        });
  	}
}
