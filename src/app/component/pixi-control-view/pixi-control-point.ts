
import * as PIXI from 'pixi.js';

// 拖曳教學
// http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=dragging.js&title=Dragging
export class PIXIControlPoint extends PIXI.Sprite {

  dragging = false;
  data: PIXI.InteractionData;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  static texture(
    app: PIXI.Application,
    radius: number = 10,
    color: number = 0xFFFFFF,
  ): PIXI.RenderTexture {

    const graphic = new PIXI.Graphics();
    graphic.beginFill(color);
    graphic.lineStyle(0);
    graphic.drawCircle(0, 0, radius);
    graphic.endFill();

    return app.renderer.generateTexture(graphic, PIXI.SCALE_MODES.LINEAR, 5);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    app: PIXI.Application,
    x: number = 0,
    y: number = 0,
    radius: number = 5,
    color: number = 0xFFFFFF,
  ) {
    // const texture = ;
    super(PIXIControlPoint.texture(app, radius, color));

    this.interactive = true;
    this.buttonMode = true;
    this.anchor.set(0.5);
    this.scale.set(1);

    this
      // events for drag start
      .on('mousedown', this.onDragStart)
      .on('touchstart', this.onDragStart)
      // events for drag end
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      // events for drag move
      .on('mousemove', this.onDragMove)
      .on('touchmove', this.onDragMove);

    app.stage.addChild(this);
    this.x = x;
    this.y = y;
  }

  onDragStart = (event) => {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd = () => {
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}
