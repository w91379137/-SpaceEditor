import { Component, HostListener, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

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

    var gr = new PIXI.Graphics();
    gr.beginFill(0xFFFFFF);
    gr.lineStyle(0);
    gr.drawCircle(5, 5, 10);
    gr.endFill();

    var texture = this.app.renderer.generateTexture(gr, PIXI.SCALE_MODES.LINEAR, 1);
    var circle = new PIXI.Sprite(texture);

    this.app.stage.addChild(circle);

    // http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=dragging.js&title=Dragging

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    circle.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    circle.buttonMode = true;

    // center the bunny's anchor point
    circle.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    circle.scale.set(3);

    // setup events
    circle
      // events for drag start
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      // events for drag end
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
      // events for drag move
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);

    // requestAnimationFrame( animate );

    circle.x = 100;
    circle.y = 100;
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

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;

  this.dragging = false;

  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }
}
