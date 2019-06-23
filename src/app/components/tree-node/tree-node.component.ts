import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import UtilitiesService from '../../services/utilities.service';
import { NG_VALUE_ACCESSOR, FormGroup,ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent implements OnInit, OnChanges {
	
	@Input() fieldName;
	@Input() parentFormGroup;
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
		if(changes.sourceObj && changes.sourceObj.currentValue) {
			this.fields = Object.keys(changes.sourceObj.currentValue);
		}
	}
	
	ngOnInit() {
		// it there is no field name, it means that it is the root node
		if(this.fieldName) {
			this.parentFormGroup.setControl(this.fieldName, new FormGroup({}));
		}
	}
	
	
}
