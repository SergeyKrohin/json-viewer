import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'json-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.scss']
})

export class SourceComponent {
	
	public src = '';
	private oldVal;
	
	@Output() onSourceChange = new EventEmitter();
	
	public onSrcChange(newSrc) {
		if(this.src !== newSrc) {
			this.src = newSrc;
			this.onSourceChange.emit(JSON.parse(newSrc));	
		}
	}
	
	public format() {
		this.src = JSON.stringify(JSON.parse(this.src), null, 4)
	}
	
	
	
}
