import { Component } from '@angular/core';
import { ControlCenterService } from './service/control-center/control-center.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private controlCenter: ControlCenterService,
  ) {

  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  onAddClick() {
    this.controlCenter.onAddClickSubject.next();
  }
}
