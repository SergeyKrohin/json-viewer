import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent implements OnInit{
	
	public sourceObj;
	
	public setSourceObj(src) {
		this.sourceObj = src;
	}
	
	public validate() {
		console.log('validating..', this.sourceObj);
	}
	
	ngOnInit() {
	}
}
