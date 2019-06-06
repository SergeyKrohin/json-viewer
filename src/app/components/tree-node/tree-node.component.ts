import { Component, Input  } from '@angular/core';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent {
	
	@Input() sourceObj;
	
	public objectKeys = Object.keys;
	public showFields = true;

	public toggleNode(isOpened) {
		this.showFields = isOpened;
	}
	
}
