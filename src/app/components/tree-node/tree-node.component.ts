import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import UtilitiesService from '../../services/utilities.service';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent implements OnChanges {
	
	@Input() sourceObj;
	@Output() onNodeChange = new EventEmitter();
	
	public fields = [];
	public showFields = true;
	public utils = UtilitiesService;

	public toggleNode(isOpened) {
		this.showFields = isOpened;
	}
	
	public updateTree(node) { 
		this.sourceObj[node.name] = node.value
		this.onNodeChange.emit(this.sourceObj);	
	}
	
	ngOnChanges(changes: SimpleChanges) {		
		if(changes.sourceObj) {
			const newFields = Object.keys(changes.sourceObj.currentValue);
			if(newFields.length !== this.fields.length) {
				this.fields = newFields;
			}
		}
	}
	
}
