import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'json-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.scss']
})

export class SourceComponent implements OnChanges {
	
	@Input() jsonSource = '';
	@Input() sourceTitle;
	@Output() onSourceChange = new EventEmitter();
	
	public setSource(newSrc) {
		if(this.jsonSource !== newSrc) {
			this.jsonSource = newSrc;
			this.onSourceChange.emit(newSrc);	
		}
	}
	
	public format(val) {
		if(val) {
			this.jsonSource = JSON.stringify(JSON.parse(val), null, 4);
		}
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.jsonSource) {
			this.jsonSource = changes.jsonSource.currentValue;
		}
	}
	
}
