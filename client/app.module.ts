import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/services/in-memory-data.service';

import { AppComponent }         from './components/app/app.component';
import { PageHeaderComponent } 	from './components/header/page-header.component';
import { PageFooterComponent }   from './components/footer/page-footer.component';
import { BlogPostListComponent }   from './components/blog-post-list/blog-post-list.component';
import { NavBarComponent }   from './components/nav-bar/nav-bar.component';
import { HomeComponent }  from './components/home/home.component';


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
    NavBarComponent,
    HomeComponent    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
