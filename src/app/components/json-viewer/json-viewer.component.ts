import { Component } from '@angular/core';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent {
	
	public treeSrc = '';
	public jsonSrc = '';
	public treeSchema = null;
	public validateTree = false;
	public errors = {
		source: '',
		schema: ''
	};
	
	public get jsonError() {
		return this.errors.source || this.errors.schema;
	}
	
	public setTreeSrc(src) {
		try {			
			this.treeSrc = src ? JSON.parse(src) : '';
			this.errors.source = '';
		} catch(e) {
			this.errors.source = 'source';
		}
	}
	
	public setSchema(src) {
		try {
			this.treeSchema = src ? JSON.parse(src) : '';
			this.errors.schema = '';
		} catch(e) {
			this.errors.schema = 'schema';
		}
	}
	
	public setJsonSrc(src) {
		this.jsonSrc = src ? JSON.stringify(src, null, 4) : '';
	}
	
	
	public validate() {
		this.validateTree = true;
	}
	
}
