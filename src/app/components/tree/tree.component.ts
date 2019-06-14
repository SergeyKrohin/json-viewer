import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { ContainedInList } from '../../validators/contained-in-list.validator';
import UtilitiesService from '../../services/utilities.service';

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
	
	public treeFormGroup;
	public utils = UtilitiesService;
	public formValidated = false;

	public updateParent(val) {
		this.onTreeChange.emit(val);
	}
	
	private getValidator(propName, propVal) {
		let validator;
		switch(propName) {
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
				validator = ContainedInList(propVal);
			break;
			default:
				validator = null;
		}
		return validator;
	}
	
	private setValidators(schema) { // TODO: refactor this function of break it in to smaller parts
		schema.absControl = {ref: this.treeFormGroup, validators: []};
		const setGroupValidators = (schema) => {
			Object.keys(schema).forEach((field, index, list) => {
				if(field !== 'absControl'){
					if(this.utils.getClass(schema[field]) === 'object') {
						const controls = schema.absControl.ref.controls;
						if(!controls || !controls[field]) {
							console.log('Shema does not mach the source');
							return;
						}
						schema[field].absControl = {ref: controls[field], validators: []};
						setGroupValidators(schema[field]);
					} else {
						let validator = this.getValidator(field, schema[field]);
						if(validator) {
							schema.absControl.validators.push(validator);
						} else if(field === 'readonly'){
							if(schema[field] === true){
								schema.absControl.ref.disable({emitEvent: false});
							} else {
								schema.absControl.ref.enable({emitEvent: false});
							}
						}
					}
					if(index === list.length-2 && schema.absControl.validators.length) {
						schema.absControl.ref.setValidators(schema.absControl.validators);
						schema.absControl.ref.updateValueAndValidity({emitEvent: false})
					}
				}
			});
		}
		setGroupValidators(schema);
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.schema && changes.schema.currentValue && !changes.schema.firstChange) {
			this.setValidators(this.schema);
			this.formValidated = true;
		}
		if(changes.treeSource) {
			this.treeFormGroup = new FormGroup({});
			this.treeSource = changes.treeSource.currentValue;
			if(this.formValidated && this.schema) {
				//check validation only after the tree finished rendering
				// TODO - create a notification when the tree finished rendering to not use setTimeout
				setTimeout(() => {
					this.setValidators(this.schema);
				});
			}
		}
	}
	
}
