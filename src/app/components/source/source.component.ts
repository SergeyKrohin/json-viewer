import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'json-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.scss']
})

export class SourceComponent implements OnChanges {
	
	@Input() jsonSource: string = '';
	@Input() sourceTitle: string;
	@Input() invalidSrc: boolean;
	@Output() onSourceChange: EventEmitter<string> = new EventEmitter();
	
	public setSource(newSrc: string) {
		if(newSrc !== this.jsonSource) {
			this.jsonSource = newSrc;
			this.onSourceChange.emit(newSrc);	
		}
	}
	
	public format(val: string) {
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
