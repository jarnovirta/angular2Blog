import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }	from './components/home/home.component';
import { ContactComponent }	from './components/contact/contact.component';
import { AboutComponent }	from './components/about/about.component';
import { BlogPostComponent }	from './components/blog-post/blog-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'posts/:id',  component: BlogPostComponent },
  { path: '**', redirectTo: '/home'}
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}