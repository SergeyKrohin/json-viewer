import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToggleBoxComponent } from '../../components/shared/toggle-box/toggle-box.component';

@NgModule({
	declarations: [ToggleBoxComponent],
	providers: [],
	imports: [BrowserModule],
	exports:[ToggleBoxComponent]
})

export class SharedModule{}