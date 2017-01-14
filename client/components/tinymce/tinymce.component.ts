declare var tinymce: any;

// Usage in parent component:
// <simple-tiny (textInput)="handlerFunction($event)" 
//    [elementId]="'my-editor-id'" (onEditorKeyup)="keyupHandlerFunction($event)"></simple-tiny>

import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Post } from './../../shared/models/post';

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() editorContent: String;
  @Output() onChange = new EventEmitter<String>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/client/assets/tinyMCEskins/lightgray',
      height: "200",
      entity_encoding : "raw",
      setup: editor => {
        this.editor = editor;
        // 'keyup' detects changes, 'change' detects undo-level changes including
        // style changes on text.
        editor.on('keyup', () => this.onChange.emit(editor.getContent()));
        editor.on('change', () => this.onChange.emit(editor.getContent()));
      },
    });
    tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
  clearContent() {
    tinymce.activeEditor.setContent("");
  }
  setPost(post: Post) {
      if (post && post.body) tinymce.activeEditor.setContent(post.body);
      else tinymce.activeEditor.setContent("");
      tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
    
  }
}