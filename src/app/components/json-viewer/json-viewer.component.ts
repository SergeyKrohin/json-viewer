import { Component, ViewChild } from '@angular/core';
import { IErrors } from './json-viewer';
import { TreeComponent } from '../tree/tree.component';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent {
	
	 @ViewChild(TreeComponent) tree;
	
	public treeSrc: object = null;
	public treeSchema: object = {};
	public jsonSrc: string = '';
	public validateBtnText: string = 'Start validation';	
	public validateTree: boolean = false;
	public errors: IErrors = {
		source: '',
		schema: ''
	};
	
	public get jsonError(): string {
		return this.errors.source || this.errors.schema;
	}
	
	public setTreeSrc(src: string) {
		try {	
			this.treeSrc = src ? JSON.parse(src) : null;
			this.errors.source = '';
		} catch(e) {
			this.errors.source = 'source';
		}
	}
	
	public setSchema(src: string) {
		try {
			this.treeSchema = src ? JSON.parse(src) : {};
			this.errors.schema = '';
		} catch(e) {
			this.errors.schema = 'schema';
		}
	}
	
	public setJsonSrc(src: object) {
		this.jsonSrc = src ? JSON.stringify(src, null, 4) : '';
	}
	
	
	public validate() {
		this.validateTree = true;
		this.validateBtnText = 'Validating';
		this.tree.setValidated();
	}
	
}
