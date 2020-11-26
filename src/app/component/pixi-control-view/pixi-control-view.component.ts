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
    mainContainer.x = 300;
    mainContainer.y = 300;
    this.app.stage.addChild(mainContainer);

    const radius = 100;

    {
      // 中間 (正)
      const triangleContainer = await this.addOneTriangle(radius);
      mainContainer.addChild(triangleContainer);
    }

    {
      // 下 (反)
      const triangleContainer = await this.addOneTriangle(radius);
      triangleContainer.scale.x = -1;
      triangleContainer.rotation = 180 * (Math.PI / 180);

      triangleContainer.x = Math.cos(90 * (Math.PI / 180)) * radius;
      triangleContainer.y = Math.sin(90 * (Math.PI / 180)) * radius;

      mainContainer.addChild(triangleContainer);
    }
    {
      // 左邊 (反)
      const triangleContainer = await this.addOneTriangle(radius);
      triangleContainer.scale.x = -1;
      triangleContainer.rotation = 60 * (Math.PI / 180);

      triangleContainer.x = Math.cos(210 * (Math.PI / 180)) * radius;
      triangleContainer.y = Math.sin(210 * (Math.PI / 180)) * radius;

      mainContainer.addChild(triangleContainer);
    }
    {
      // 右邊 (反)
      const triangleContainer = await this.addOneTriangle(radius);
      triangleContainer.scale.x = -1;
      triangleContainer.rotation = -60 * (Math.PI / 180);

      triangleContainer.x = Math.cos(330 * (Math.PI / 180)) * radius;
      triangleContainer.y = Math.sin(330 * (Math.PI / 180)) * radius;

      mainContainer.addChild(triangleContainer);
    }

    // {
    //   const triangleContainer = await this.addOneTriangle(radius);

    //   triangleContainer.y = Math.sin(60 * (.5) * (Math.PI / 180)) * 300;

    //   mainContainer.addChild(triangleContainer);
    // }
    // {
    //   const triangleContainer = await this.addOneTriangle();
    //   triangleContainer.scale.y = -1;
    //   triangleContainer.y = -Math.sin(60 * (.5) * (Math.PI / 180)) * 300;

    //   mainContainer.addChild(triangleContainer);
    // }
  }

  async addOneTriangle(radius) {
    const triangleContainer = new PIXI.Container();

    const triangleMask = new PIXI.Graphics();
    triangleMask.beginFill(0xffffff, .3);
    // triangleMask.beginFill(0x000000, .3);

    triangleMask.moveTo(
      Math.cos(30 * (Math.PI / 180)) * radius,
      Math.sin(30 * (Math.PI / 180)) * radius,
    );
    triangleMask.lineTo(
      Math.cos(150 * (Math.PI / 180)) * radius,
      Math.sin(150 * (Math.PI / 180)) * radius,
    );
    triangleMask.lineTo(
      Math.cos(270 * (Math.PI / 180)) * radius,
      Math.sin(270 * (Math.PI / 180)) * radius,
    );
    triangleMask.lineTo(
      Math.cos(30 * (Math.PI / 180)) * radius,
      Math.sin(30 * (Math.PI / 180)) * radius,
    );
    triangleMask.endFill();

    const texture = await PIXI.Texture.fromURL('https://upload.wikimedia.org/wikipedia/commons/b/bc/T_albidum01.jpg');
    const flower = new PIXI.Sprite(texture);
    triangleContainer.addChild(flower);
    flower.anchor.set(0.5);

    // flower.rotation = -30 * (Math.PI / 180); // from 63 * -.5
    flower.x = 0;
    flower.y = -20;
    this.app.ticker.add((delta) => {
      flower.rotation += 0.03 * delta;
    });

    triangleContainer.mask = triangleMask;
    triangleContainer.addChild(triangleMask);

    return triangleContainer;
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
