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

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() editorContent: String;
  @Output() textInput = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'client/assets/tinyMCEskins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.editorContent = content;
          this.textInput.emit(content);
          console.log("Emitter: " + content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}