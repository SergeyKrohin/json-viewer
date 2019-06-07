import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'json-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.scss']
})

export class SourceComponent {
	
	public src;
	
	@Output() onSourceChange = new EventEmitter();
	
	public onSrcChange(source) {
		this.src = source;
		this.onSourceChange.emit(JSON.parse(source));
	}
	
	public format() {
		this.src = JSON.stringify(JSON.parse(this.src), null, 4)
	}
	
	
	
}
