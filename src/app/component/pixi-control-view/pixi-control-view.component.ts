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

    this.test();
  }

  async test() {
    // 測試

    const mainContainer = new PIXI.Container();
    mainContainer.x = 256;
    mainContainer.y = 256;

    const triangleContainer = new PIXI.Container();
    mainContainer.addChild(triangleContainer);

    const radius = 530;
    const triangleMask = new PIXI.Graphics();
    triangleMask.beginFill(0xffffff, .3);
    triangleMask.moveTo(0, 0);
    triangleMask.lineTo(Math.cos(60 * (-.5) * (Math.PI / 180)) * radius, Math.sin(60 * (-.5) * (Math.PI / 180)) * radius);
    triangleMask.lineTo(Math.cos(60 * (.5) * (Math.PI / 180)) * radius, Math.sin(60 * (.5) * (Math.PI / 180)) * radius);
    triangleMask.lineTo(0, 0);
    triangleMask.endFill();
    // mainContainer.addChild(triangleMask);

    const texture = await PIXI.Texture.fromURL('https://upload.wikimedia.org/wikipedia/commons/b/bc/T_albidum01.jpg');
    const flower = new PIXI.Sprite(texture);
    triangleContainer.addChild(flower);
    flower.anchor.set(0.5);

    // flower.rotation = -30 * (Math.PI / 180); // from 63 * -.5
    flower.x = 0;
    flower.y = 0;
    let x = 0;
    this.app.ticker.add((delta) => {
      flower.rotation += 0.03 * delta;
      x =  (x + 3 * delta) % 256;
      flower.x = x;
    });
    flower.scale.y = -1; // 上下顛倒

    triangleContainer.mask = triangleMask;

    this.app.stage.addChild(mainContainer);
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
