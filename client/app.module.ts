import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { PostService}  from './shared/services/post.service';
import { CommentService}  from './shared/services/comment.service';
import { WebsocketService } from './shared/services/websocket.service';
import { UserService } from './shared/services/user.service';

import { AppComponent }         from './components/app/app.component';
import { PageHeaderComponent } 	from './components/header/page-header.component';
import { PageFooterComponent }   from './components/footer/page-footer.component';
import { BlogPostListComponent }   from './components/blog-post-list/blog-post-list.component';
import { NavBarComponent }   from './components/nav-bar/nav-bar.component';
import { HomeComponent }  from './components/home/home.component';
import { ContactComponent }   from './components/contact/contact.component';
import { AboutComponent }   from './components/about/about.component';
import { BlogPostComponent }  from './components/blog-post/blog-post.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { SimpleTinyComponent }  from './components/tinymce/tinymce.component';
import { EditPostComponent } from './components/editPost/edit-post.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PageInfoService }  from './shared/services/page-info.service';
import { CommentSectionComponent }  from './components/comment-section/comment-section.component';
import { CommentComponent }  from './components/comment/comment.component';
import { LoginLogoutComponent }  from './components/login-logout/login-logout.component';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule
  ],
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    BlogPostListComponent,
    NavBarComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    BlogPostComponent,
    SimpleTinyComponent,
    EditPostComponent,
    CommentFormComponent,
    CommentSectionComponent,
    CommentComponent,
    LoginLogoutComponent
  ],
  providers: [ PostService, WebsocketService, PageInfoService, CommentService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
