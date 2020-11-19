import { Component, OnInit } from '@angular/core';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent implements OnInit {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private controlCenter: ControlCenterService,
  ) { }

  ngOnInit() {

  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  onAddClick() {
    this.controlCenter.beforeAddControlPointSubject.next();
  }
}
