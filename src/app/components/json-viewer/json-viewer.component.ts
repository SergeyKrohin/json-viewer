import { Component } from '@angular/core';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent {
	
	public treeSrc = '';
	public jsonSrc = '';
	
	public setTreeSrc(src) {
		this.treeSrc = JSON.parse(src);
	}
	
	public setJsonSrc(src) {
		this.jsonSrc = JSON.stringify(src, null, 4);
	}
	
	public validate() {
		console.log('validating..', this.treeSrc);
	}
	
}
