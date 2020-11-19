import { Component, OnInit } from '@angular/core';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';

@Component({
  selector: 'app-h5-display-view',
  templateUrl: './h5-display-view.component.html',
  styleUrls: ['./h5-display-view.component.scss']
})
export class H5DisplayViewComponent implements OnInit {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    public controlCenter: ControlCenterService,
  ) { }

  ngOnInit() {

  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
}
