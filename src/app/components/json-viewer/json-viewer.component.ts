import { Component } from '@angular/core';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent {
	
	public sourceObj;
	
	public setSourceObj(src) {
		this.sourceObj = src;
	}
	
	public validate() {
		console.log('validating..', this.sourceObj);
	}
	
}
