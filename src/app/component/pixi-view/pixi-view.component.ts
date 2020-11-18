import { Component, HostListener, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';
import { ControlPoint } from 'src/class/control-point';

@Component({
  selector: 'app-pixi-view',
  templateUrl: './pixi-view.component.html',
  styleUrls: ['./pixi-view.component.scss']
})
export class PixiViewComponent implements OnInit {

  app: PIXI.Application;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private controlCenter: ControlCenterService,
  ) {
    this.controlCenter.onAddClickSubject.subscribe(() => {
      this.onAddClick();
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
  onAddClick() {
    const circle = new ControlPoint(this.app, 100, 100, 10, 0x333333);
  }
}
