import { Injectable } from '@angular/core';
import { ControlCenterService } from '../control-center/control-center.service';
import { ApiService } from '../api/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class PodcastCenterService {

  createApiURL = '';
  openCreate = false;

  updateApiURL = '';
  openUpdate = false;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private controlCenter: ControlCenterService,
    private api: ApiService,
  ) {
    this.controlCenter.afterAddControlPointSubject.subscribe((point) => {

      if (this.createApiURL && this.openCreate) {
        console.log('create', this.createApiURL, this.openCreate, point);
        this.api.convenientReq(this.createApiURL, point.date(), '').catch(err => console.log(err));
      }

      point.updateSubject.subscribe(() => {

        if (this.updateApiURL && this.openUpdate) {
          console.log('update', this.updateApiURL, this.openUpdate, point);
          this.api.convenientReq(this.updateApiURL, point.date(), '').catch(err => console.log(err));
        }

      });
    });

    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  }
}
