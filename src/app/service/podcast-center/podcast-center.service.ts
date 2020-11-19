import { Injectable } from '@angular/core';
import { ControlCenterService } from '../control-center/control-center.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastCenterService {

  constructor(
    private controlCenter: ControlCenterService,
  ) {
    this.controlCenter.afterAddControlPointSubject.subscribe((point) => {

      // console.log('create', point);

      point.updateSubject.subscribe(() => {

        // console.log('update', point);

      });
    });
  }
}
