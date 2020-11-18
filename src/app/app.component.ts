import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pixi-typescript';

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  ngOnInit(): void {

    const app = new PIXI.Application({
      width: 256,         // default: 800
      height: 256,        // default: 600
      antialias: true,    // default: false
      transparent: false, // default: false
      resolution: 1,       // default: 1
      forceCanvas: true,
    });
    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0x0616ff;
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
}
