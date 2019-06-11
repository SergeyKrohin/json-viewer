import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnChanges {

	@Input() schema;
	@Input() treeTitle;
	@Input() treeSource;
	@Output() onTreeChange = new EventEmitter();
	
	public myForm = new FormGroup({});

	public updateParent(val) {
		this.onTreeChange.emit(val);
	}
	
	private getValidator(propName, propVal) {
		
		let validator;
		
		switch(propName) {
			case 'readonly':
				validator = null;
			break;
			case 'minimalLength':
				validator = Validators.minLength(propVal);
			break;
			case 'maximalLength':
				validator = Validators.maxLength(propVal);
			break;
			case 'from':
				validator = Validators.min(propVal);
			break;
			case 'to':
				validator = Validators.max(propVal);
			break;
			case 'values':
				validator = null;
			break;
			default:
				validator = null;
		}
		
		return validator;
		
	}
	
	private setValidators(schema) {
		let formGroup:any = {
			ref: this.myForm,
			validators: [],
			fieldName: ''
		};
		const setGroupValidators = (schema) => {
			Object.keys(schema).forEach((field, index, list) => {
				if(typeof schema[field] === 'object') {
					formGroup = {
						ref: formGroup.ref.controls[field],
						validators: [],
						fieldName: field
					}
					setGroupValidators(schema[field]);
				} else {
					let validator = this.getValidator(field, schema[field]);
					if(validator) {
						formGroup.validators.push(validator);
					}
				}
				if(index === list.length-1 && formGroup.validators.length) {
					formGroup.ref.setValidators(formGroup.validators);
					formGroup.ref.updateValueAndValidity({emitEvent: false})
				}
			});
		}
		setGroupValidators(schema);
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.schema && !changes.schema.firstChange) {
			this.setValidators(this.schema);	
		}
	}
	
}
