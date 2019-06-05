import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { JsonViewerModule } from './modules/json-viewer/json-viewer.module';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	JsonViewerModule,
	CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
