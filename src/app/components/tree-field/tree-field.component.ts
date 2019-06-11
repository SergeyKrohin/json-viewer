import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'tree-field',
	templateUrl: './tree-field.component.html',
	styleUrls: ['./tree-field.component.scss']
})

export class TreeFieldComponent implements OnChanges, OnInit {
	
	@Input() fieldFormGroup;
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
        tmp.innerHTML = value.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		this.fieldWidth = Math.max(minWidth, tmp.getBoundingClientRect().width + padding);
	}
	
	public updateNode(val) {
		this.onFieldChange.emit({
			name: this.fieldName,
			value: val
		});	
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.fieldValue) {
			//calculate input width only for strings or numbers
			if(typeof changes.fieldValue.currentValue === 'string' || 
				typeof changes.fieldValue.currentValue === 'number') {
				this.calcInputWidth(this.fieldValue);
			}
			if(this.fieldFormGroup.get(this.fieldName)) {
				this.fieldFormGroup.get(this.fieldName).setValue(this.fieldValue, {emitEvent: false});
			}
		}
	}
	
	ngOnInit() {
		if(this.fieldFormGroup && typeof this.fieldValue !== 'object'){
			this.fieldFormGroup.setControl(this.fieldName, new FormControl(this.fieldValue));
			
			this.fieldFormGroup.get(this.fieldName).valueChanges.subscribe(val => {
				this.calcInputWidth(val);
				this.updateNode(val);
			});
		}
	}
}
