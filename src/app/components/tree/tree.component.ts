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
	
	public treeFormGroup = new FormGroup({});
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
				validator = Array.isArray(propVal) ? ContainedInList(propVal) : null;
			break;
			default:
				validator = null;
		}
		return validator;
	}
	
	private setValidators(formGroup: FormGroup, schema):void {
		Object.keys(formGroup.controls).forEach(controlKey => {
			const abstractControl:AbstractControl = formGroup.get(controlKey);
			const schemaReference = schema[controlKey];
			if(abstractControl instanceof FormGroup) {
				this.setValidators(abstractControl, schemaReference);
			} else {	
				abstractControl.clearValidators();
				if(this.utils.getClass(schemaReference) === 'object'){
					const validators = [];
					Object.keys(schemaReference).forEach(schemaKey => {
						if(schemaKey === 'readonly') {
							schemaReference[schemaKey] === true ? 
								abstractControl.disable({emitEvent: false}) : 
								abstractControl.enable({emitEvent: false});
						} else {							
							const validator = this.getValidator(schemaKey, schemaReference[schemaKey])
							if(validator) {
								validators.push(validator);
							}
						}
					});					
					if(validators.length) {
						abstractControl.setValidators(validators);
					}
				}
				abstractControl.updateValueAndValidity({emitEvent: false});
			}
		});
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.schema && changes.schema.currentValue) {
			this.setValidators(this.treeFormGroup, this.schema);
			this.formValidated = true;
		}
		if(changes.treeSource && changes.treeSource.currentValue) {
			this.treeFormGroup = new FormGroup({});
			if(this.formValidated) {
				// temporary solution to wait untill the form group structure is set
				// TODO - use notification - formStructureIsSet instead of timeout
				setTimeout(() => {// TODO - create notificationchange this to 
					this.setValidators(this.treeFormGroup, this.schema);
				});
			}
		}
	}
	
}
