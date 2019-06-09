import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'json-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.scss']
})

export class SourceComponent {
	
	@Input() sourceTitle;
	@Output() onSrcChange = new EventEmitter();
	
	public src = '';
	
	public onSourceChange(newSrc) {
		if(this.src !== newSrc) {
			this.src = newSrc;
			this.onSrcChange.emit(JSON.parse(newSrc));	
		}
	}
	
	public format() {
		if(this.src) {
			this.src = JSON.stringify(JSON.parse(this.src), null, 4);
		}
	}
	
	
	
}
