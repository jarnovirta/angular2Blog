import { Component, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Post } from './../../shared/models/post';
import { SimpleTinyComponent } from './../tinymce/tinymce.component';

@Component({
  moduleId: module.id,
  selector: 'editPost',
  templateUrl: 'editPost.component.html' 
})

export class EditPostComponent  {
	@Output() editFinished = new EventEmitter<any>();
	@Input() post: Post;

	@ViewChild(SimpleTinyComponent)
	private tinyMCEchild: SimpleTinyComponent;

	setPostBody(body: string) {
		this.post.body = body;
	}
	cancel() {
		this.tinyMCEchild.clearContent();
		this.post = new Post();
		this.editFinished.next();
	}
	addPost() {
		this.tinyMCEchild.clearContent();
		this.post = new Post();
		this.editFinished.emit();
	}
}