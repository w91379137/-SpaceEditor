import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PixiViewComponent } from './component/pixi-view/pixi-view.component';
import { ControlCenterService } from './service/control-center/control-center.service';

@NgModule({
  declarations: [
    AppComponent,
    PixiViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ControlCenterService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
