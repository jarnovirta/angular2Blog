import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppComponent }         from './app.component';
import { PageHeaderComponent } 	from './page-header.component';
import { PageFooterComponent }   from './page-footer.component';
import { BlogPostListComponent }   from './blog-post-list.component';
import { NavBarComponent }   from './nav-bar.component';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),

  ],
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    BlogPostListComponent,
    NavBarComponent    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
