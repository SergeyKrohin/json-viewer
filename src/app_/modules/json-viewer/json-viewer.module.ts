import { JsonViewerComponent } from '../../components/json-viewer/json-viewer.component';
import { TreeComponent } from '../../components/tree/tree.component';
import { SourceComponent } from '../../components/source/source.component';
import { TreeNodeComponent } from '../../components/tree-node/tree-node.component';
import { TreeFieldComponent } from '../../components/tree-field/tree-field.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
	declarations: [JsonViewerComponent, TreeComponent, SourceComponent, TreeNodeComponent, TreeFieldComponent],
	imports: [SharedModule ,BrowserModule, FormsModule, ReactiveFormsModule, CoreModule],
	providers: [],
	exports: [JsonViewerComponent]
})

export class JsonViewerModule {}