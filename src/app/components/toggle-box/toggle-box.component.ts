import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'toggle-box',
	templateUrl: './toggle-box.component.html',
	styleUrls: ['./toggle-box.component.scss']
})

export class ToggleBoxComponent{
	
	@Output() onToggle = new EventEmitter();
	
	public isOpened = true;
	
	public toggle() {
		this.onToggle.emit(this.isOpened = !this.isOpened);
	}
}
