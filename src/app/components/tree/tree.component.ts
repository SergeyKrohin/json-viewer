import { Component, Input } from '@angular/core';

@Component({
	selector: 'tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})

export class TreeComponent{

	@Input() treeTitle;
	@Input() treeSource;
	
}
