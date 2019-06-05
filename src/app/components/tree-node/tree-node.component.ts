import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent implements OnInit{
	
	@Input() sourceObj;
	@Input() fieldName;
	
	public fieldType;
	public objectKeys = Object.keys;
	public showFields = true;

	public toggleNode(isOpened) {
		this.showFields = isOpened;
	}
	
	public parse() {
		console.log(this.sourceObj);
	}
	
	public typeOf(field) {
		return typeof field;
	}
	
	ngOnInit() {
		console.log(this.sourceObj);
	}
	
}
