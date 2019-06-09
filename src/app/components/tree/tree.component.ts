import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})

export class TreeComponent{

	@Input() treeTitle;
	@Input() treeSource;
	@Output() onTreeChange = new EventEmitter();

	public updateParent(val) {
		this.onTreeChange.emit(val);
	}
	
}
