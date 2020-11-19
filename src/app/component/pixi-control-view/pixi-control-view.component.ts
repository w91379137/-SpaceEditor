import { Component, HostListener, OnInit } from '@angular/core';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';
import { PIXIControlPoint } from 'src/app/component/pixi-control-view/pixi-control-point';
import * as PIXI from 'pixi.js';
import { ControlPoint } from '../../service/control-center/control-point';

@Component({
  selector: 'app-pixi-control-view',
  templateUrl: './pixi-control-view.component.html',
  styleUrls: ['./pixi-control-view.component.scss']
})
export class PixiControlViewComponent implements OnInit {

  app: PIXI.Application;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private controlCenter: ControlCenterService,
  ) {
    this.controlCenter.afterAddControlPointSubject.subscribe((point) => {
      this.onAddPoint(point);
    });
  }

  ngOnInit(): void {

    this.app = new PIXI.Application({
      width: 256,         // default: 800
      height: 256,        // default: 600
      antialias: true,    // default: false
      transparent: true, // default: false
      resolution: 1,       // default: 1
      forceCanvas: true,
    });

    document.querySelector('#pixi').appendChild(this.app.view);
    this.resize(window.innerWidth, window.innerHeight);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const target = event.target;
    this.resize(target.innerWidth, target.innerHeight);
  }

  resize(width, height) {
    console.log(width, height);
    this.app.renderer.resize(width, height);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  onAddPoint(point: ControlPoint) {
    const pixiPoint = new PIXIControlPoint(this.app, point.x, point.y, point.radius, point.color);
    pixiPoint.updateSubject.subscribe((_) => {
      point.x = pixiPoint.x;
      point.y = pixiPoint.y;
    });
  }
}
