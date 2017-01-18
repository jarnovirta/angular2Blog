"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var post_service_1 = require('./shared/services/post.service');
var comment_service_1 = require('./shared/services/comment.service');
var websocket_service_1 = require('./shared/services/websocket.service');
var user_service_1 = require('./shared/services/user.service');
var app_component_1 = require('./components/app/app.component');
var page_header_component_1 = require('./components/header/page-header.component');
var page_footer_component_1 = require('./components/footer/page-footer.component');
var blog_post_list_component_1 = require('./components/blog-post-list/blog-post-list.component');
var nav_bar_component_1 = require('./components/nav-bar/nav-bar.component');
var home_component_1 = require('./components/home/home.component');
var contact_component_1 = require('./components/contact/contact.component');
var about_component_1 = require('./components/about/about.component');
var blog_post_component_1 = require('./components/blog-post/blog-post.component');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll');
var tinymce_component_1 = require('./components/tinymce/tinymce.component');
var edit_post_component_1 = require('./components/editPost/edit-post.component');
var comment_form_component_1 = require('./components/comment-form/comment-form.component');
var page_info_service_1 = require('./shared/services/page-info.service');
var comment_section_component_1 = require('./components/comment-section/comment-section.component');
var comment_component_1 = require('./components/comment/comment.component');
var login_logout_component_1 = require('./components/login-logout/login-logout.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                app_routing_module_1.AppRoutingModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angular2_infinite_scroll_1.InfiniteScrollModule
            ],
            declarations: [
                app_component_1.AppComponent,
                page_header_component_1.PageHeaderComponent,
                page_footer_component_1.PageFooterComponent,
                blog_post_list_component_1.BlogPostListComponent,
                nav_bar_component_1.NavBarComponent,
                home_component_1.HomeComponent,
                contact_component_1.ContactComponent,
                about_component_1.AboutComponent,
                blog_post_component_1.BlogPostComponent,
                tinymce_component_1.SimpleTinyComponent,
                edit_post_component_1.EditPostComponent,
                comment_form_component_1.CommentFormComponent,
                comment_section_component_1.CommentSectionComponent,
                comment_component_1.CommentComponent,
                login_logout_component_1.LoginLogoutComponent
            ],
            providers: [post_service_1.PostService, websocket_service_1.WebsocketService, page_info_service_1.PageInfoService, comment_service_1.CommentService, user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map