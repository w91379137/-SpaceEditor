import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ControlPoint, ControlPointData, ControlPointDefaultData } from './control-point';

@Injectable({
  providedIn: 'root'
})
export class ControlCenterService {

  readonly beforeAddControlPointSubject = new Subject<ControlPointData>();
  readonly controlPointArr: ControlPoint[] = [];
  readonly afterAddControlPointSubject = new Subject<ControlPoint>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() {
    this.beforeAddControlPointSubject.subscribe((date) => {
      this.addControlPoint(date || ControlPointDefaultData);
    });
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  private addControlPoint(data: ControlPointData) {
    const point = new ControlPoint(data.x, data.y, data.radius, data.color);
    this.controlPointArr.push(point);
    this.afterAddControlPointSubject.next(point);
  }
}
