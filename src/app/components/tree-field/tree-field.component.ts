import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { FormControl,NgForm, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'tree-field',
	templateUrl: './tree-field.component.html',
	styleUrls: ['./tree-field.component.scss']
})

export class TreeFieldComponent implements OnChanges {
	
	@Input() nodeFormGroup;
	@Input() fieldName;
	@Input() fieldValue;
	@Output() onFieldChange = new EventEmitter();

	public fieldWidth;
	
	public typeOf(field) {
		return typeof field;
	}
		
	public onInputChange(value)	{
		this.calcInputWidth(value);
		this.updateNode(value);
	}
		
	public calcInputWidth(value) {
		const padding = 6, minWidth = 50;
		let tmp = document.getElementById('input-width-calc-helper');
		if(!tmp) {
			tmp = document.createElement("span");		
			tmp.id = "input-width-calc-helper";	
			document.body.appendChild(tmp);
		}
        tmp.innerHTML = value ? value.toString() : '';
		this.fieldWidth = Math.max(minWidth, tmp.getBoundingClientRect().width + padding);
	}
	
	public updateNode(val) {
		this.onFieldChange.emit({
			name: this.fieldName,
			value: val
		});	
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.nodeFormGroup && changes.nodeFormGroup.currentValue) {
			//when the type is object, field renders new node
			if(typeof this.fieldValue !== 'object'){
				this.nodeFormGroup.setControl(this.fieldName, new FormControl(this.fieldValue));
				if(typeof this.fieldValue === 'string' || typeof this.fieldValue === 'number') {
					this.calcInputWidth(this.fieldValue);
				}
				this.nodeFormGroup.get(this.fieldName).valueChanges.subscribe(val => {
					this.calcInputWidth(val);
					this.updateNode(val);
				});
			}
		}
	}

}
