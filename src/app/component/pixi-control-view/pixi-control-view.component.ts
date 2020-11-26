import { Component, HostListener, OnInit } from '@angular/core';
import { ControlCenterService } from 'src/app/service/control-center/control-center.service';
import { PIXIControlPoint } from 'src/app/component/pixi-control-view/pixi-control-point';
import * as PIXI from 'pixi.js';
import { ControlPoint } from '../../service/control-center/control-point';
import { single } from 'rxjs/operators';

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
      const triangleContainer = await this.addOneTriangle(radius);
      mainContainer.addChild(triangleContainer);
    }
    {
      for (let index = 0; index < 3; index++) {

        const triangleContainer = await this.addOneTriangle(radius);
        triangleContainer.scale.x = -1;

        const thetaR = 60 + 120 * index;
        triangleContainer.rotation = thetaR * (Math.PI / 180);

        const thetaC = -150 - 120 * index;
        triangleContainer.x = Math.cos(thetaC * (Math.PI / 180)) * radius;
        triangleContainer.y = Math.sin(thetaC * (Math.PI / 180)) * radius;

        mainContainer.addChild(triangleContainer);
      }
    }
    {
      for (let index = 0; index < 3; index++) {
        const triangleContainer = await this.addOneTriangle(radius);

        const thetaR = 120;
        triangleContainer.rotation = thetaR * (Math.PI / 180);

        const thetaC = 0 - 120 * index;
        triangleContainer.x = Math.cos(thetaC * (Math.PI / 180)) * radius * Math.sqrt(3);
        triangleContainer.y = Math.sin(thetaC * (Math.PI / 180)) * radius * Math.sqrt(3);

        mainContainer.addChild(triangleContainer);
      }
    }
    {
      // const index = 0;
      for (let index = 0; index < 3; index++) {
        const triangleContainer = await this.addOneTriangle(radius);

        const thetaR = -120;
        triangleContainer.rotation = thetaR * (Math.PI / 180);

        const thetaC = 60 - 120 * index;
        triangleContainer.x = Math.cos(thetaC * (Math.PI / 180)) * radius * Math.sqrt(3);
        triangleContainer.y = Math.sin(thetaC * (Math.PI / 180)) * radius * Math.sqrt(3);

        mainContainer.addChild(triangleContainer);
      }
    }
    {
      // const index = 0;
      for (let index = 0; index < 3; index++) {
        const triangleContainer = await this.addOneTriangle(radius);
        triangleContainer.scale.x = -1;

        const thetaR = 180 + 120 * index;
        triangleContainer.rotation = thetaR * (Math.PI / 180);

        const thetaC = -90 - 120 * index;
        triangleContainer.x = Math.cos(thetaC * (Math.PI / 180)) * radius * 2;
        triangleContainer.y = Math.sin(thetaC * (Math.PI / 180)) * radius * 2;

        mainContainer.addChild(triangleContainer);
      }
    }
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
      flower.rotation += 0.02 * delta;
      const theta = Math.cos(flower.rotation);
      const scale = 1.3 + 0.3 * Math.sin(theta);
      flower.scale.x = scale;
      flower.scale.y = scale;
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
