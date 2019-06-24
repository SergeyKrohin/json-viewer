import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { ContainedInList } from '../../validators/contained-in-list.validator';
import UtilitiesService from '../../services/utilities.service';

@Component({
	selector: 'tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})

export class TreeComponent {
	
	constructor(private cdRef: ChangeDetectorRef) {}

	@Input() schema;
	@Input() treeTitle;
	@Input() treeSource;
	@Output() onTreeChange = new EventEmitter();
	
	private treeSourceChanged = false;
	public treeFormGroup = new FormGroup({});
	public utils = UtilitiesService;
	public formValidated = false;
	
	public updateParent(val) {
		this.onTreeChange.emit(val);
	}
	
	public setValidated() {
		this.formValidated = true;
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
	
	private resetControl(control) {
		control.clearValidators();
		control.enable({emitEvent: false});
	}
	
	private setValidators(formControl, schema) {
		const validators = [];
		Object.keys(schema).forEach(schemaKey => {
			if(schemaKey === 'readonly' && schema[schemaKey] === true) {
				formControl.disable({emitEvent: false});
			} else {					
				const validator = this.getValidator(schemaKey, schema[schemaKey]);
				if(validator) {
					validators.push(validator);
				}
			}
		});
		if(validators.length) {
			formControl.setValidators(validators);
		} else {
			formControl.clearValidators();
		}
		formControl.updateValueAndValidity({emitEvent: false});
	}
	
	private validateTree(formGroup: FormGroup, schema) {
		Object.keys(formGroup.controls).forEach(controlKey => {
			const abstractControl:AbstractControl = formGroup.get(controlKey),
				schemaReference = schema[controlKey];
			this.resetControl(abstractControl);
			if(this.utils.getClass(schemaReference) !== 'object') { return; }
			if(abstractControl instanceof FormGroup) {
				this.validateTree(abstractControl, schemaReference);
			} else {
				this.setValidators(abstractControl, schemaReference);
			}
		});
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.schema && changes.schema.currentValue) {
			this.validateTree(this.treeFormGroup, this.schema);
			this.formValidated = true;
		}
		if(changes.treeSource && changes.treeSource.currentValue) {
			if(this.formValidated) {
				// use this flag inside after view checked hook to run the validation
				this.treeSourceChanged = true;
			}
		}
	}
	
	ngAfterViewChecked() {
		if(this.treeSourceChanged) {
			this.validateTree(this.treeFormGroup, this.schema);
			this.cdRef.detectChanges(); // work around - ExpressionChangedAfterItHasBeenCheckedError
			this.treeSourceChanged = false;
		}
	}
	
}
