import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { JsonViewerModule } from './modules/json-viewer/json-viewer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	JsonViewerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
