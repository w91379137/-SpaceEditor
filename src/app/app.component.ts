import { Component, HostListener, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { ControlPoint } from 'src/class/control-point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pixi-typescript';
  app: PIXI.Application;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  ngOnInit(): void {

    this.app = new PIXI.Application({
      width: 256,         // default: 800
      height: 256,        // default: 600
      antialias: true,    // default: false
      transparent: false, // default: false
      resolution: 1,       // default: 1
      forceCanvas: true,
    });
    document.body.appendChild(this.app.view);
    this.app.renderer.backgroundColor = 0x0616ff;
    this.resize(window.innerWidth, window.innerHeight);

    const circle = ControlPoint.create(this.app, 100, 100);
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
}
