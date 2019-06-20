import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import UtilitiesService from '../../services/utilities.service';
import { NG_VALUE_ACCESSOR, FormGroup,ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent implements OnChanges {
	
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
			const newFields = Object.keys(changes.sourceObj.currentValue);
			if(newFields.length !== this.fields.length) {
				this.fields = newFields;
			}
		}
		if(changes.parentFormGroup){		
			if(this.parentFormGroup && this.fieldName) {
				this.parentFormGroup.addControl(this.fieldName, new FormGroup({}));
			}
		}
	}
	
}
