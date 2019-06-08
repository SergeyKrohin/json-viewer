import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'tree-field',
	templateUrl: './tree-field.component.html',
	styleUrls: ['./tree-field.component.scss']
})

export class TreeFieldComponent implements OnChanges {
	
	@Input() fieldName;
	@Input() fieldValue;

	public fieldWidth;
	
	public typeOf(field) {
		return typeof field;
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
	
	ngOnChanges(changes: SimpleChanges) {
		if(changes.fieldValue && ( //calculate input width only for strings or numbers
			typeof changes.fieldValue.currentValue === 'string' || 
			typeof changes.fieldValue.currentValue === 'number')) {
				this.calcInputWidth(this.fieldValue);
		}
	}
	
}
