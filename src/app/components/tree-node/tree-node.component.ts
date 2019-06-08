import { Component, Input, OnInit } from '@angular/core';
import UtilitiesService from '../../services/utilities.service';

@Component({
	selector: 'tree-node',
	templateUrl: './tree-node.component.html',
	styleUrls: ['./tree-node.component.scss']
})

export class TreeNodeComponent implements OnInit {
	
	@Input() sourceObj;
	
	public fields = [];
	public showFields = true;
	public utils = UtilitiesService;

	public toggleNode(isOpened) {
		this.showFields = isOpened;
	}
	
	ngOnInit() {
		this.fields = Object.keys(this.sourceObj)
	}
	
}
