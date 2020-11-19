import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlCenterService } from './service/control-center/control-center.service';
import { PixiControlViewComponent } from './component/pixi-control-view/pixi-control-view.component';
import { H5DisplayViewComponent } from './component/h5-display-view/h5-display-view.component';
import { SettingViewComponent } from './component/setting-view/setting-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PixiControlViewComponent,
    H5DisplayViewComponent,
    SettingViewComponent,
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
