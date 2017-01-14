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
  @Output() onChange = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'client/assets/tinyMCEskins/lightgray',
      content: "shit",
      height: "200",
      entity_encoding : "raw",
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onChange.emit(content);
        });

      },
    });
    tinymce.activeEditor.setContent(this.editorContent);
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
  clearContent() {
    tinymce.activeEditor.setContent("");
  }
}