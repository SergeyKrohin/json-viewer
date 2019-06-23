import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'tree-field',
	templateUrl: './tree-field.component.html',
	styleUrls: ['./tree-field.component.scss']
})

export class TreeFieldComponent implements OnChanges, OnDestroy {
	
	@Input() nodeFormGroup;
	@Input() fieldName;
	@Input() fieldValue;
	@Output() onFieldChange = new EventEmitter();

	private valChangeSub;
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

	private onValueChange(val) {
		if(typeof this.fieldValue !== 'boolean') {
			this.calcInputWidth(val);
		}
		this.updateNode(val);
	}
	
	private setNewControl() {
		this.nodeFormGroup.setControl(this.fieldName, new FormControl(this.fieldValue));
		this.valChangeSub = this.nodeFormGroup.get(this.fieldName).valueChanges.subscribe(val => {
			this.onValueChange(val);
		});
		if(typeof this.fieldValue !== 'boolean') {
			this.calcInputWidth(this.fieldValue);
		}
	}

	private setControlVal() {
		this.nodeFormGroup.get(this.fieldName).setValue(this.fieldValue, {emitEvent:false});
		if(typeof this.fieldValue !== 'boolean') {
			this.calcInputWidth(this.fieldValue);
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes.fieldValue) {
			//when the type is object, field renders new node
			if(typeof changes.fieldValue.currentValue !== 'object') {
				// create new control on init or in case the form group was removed
				if(changes.fieldValue.firstChange || typeof changes.fieldValue.previousValue === 'object') {
					this.setNewControl();
				} else {
					this.setControlVal();
				}
			}
		}
	}
	
	ngOnDestroy() {
		this.nodeFormGroup.removeControl(this.fieldName);
		if(this.valChangeSub) {
			this.valChangeSub.unsubscribe();
		}
	}

}
