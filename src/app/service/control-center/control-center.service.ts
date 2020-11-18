import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ControlPoint } from 'src/class/control-point';

@Injectable({
  providedIn: 'root'
})
export class ControlCenterService {

  onAddClickSubject = new Subject<void>();
  controlPointArr: ControlPoint[] = [];

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() {

  }
}
