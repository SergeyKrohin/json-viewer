import { JsonViewerComponent } from '../../components/json-viewer/json-viewer.component';
import { TreeComponent } from '../../components/tree/tree.component';
import { SourceComponent } from '../../components/source/source.component';
import { TreeNodeComponent } from '../../components/tree-node/tree-node.component';
import { ToggleBoxComponent } from '../../components/toggle-box/toggle-box.component';
import { TreeFieldComponent } from '../../components/tree-field/tree-field.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { JsonViewerRoutingModule } from './json-viewer-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
	declarations: [JsonViewerComponent, TreeComponent, SourceComponent, TreeNodeComponent, ToggleBoxComponent, TreeFieldComponent],
	imports: [SharedModule ,BrowserModule, FormsModule, JsonViewerRoutingModule, CoreModule],
	providers: [],
	exports: [JsonViewerComponent]
})

export class JsonViewerModule {}