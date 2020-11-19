
let uuidCounter = 0;

function getUUID() {
  uuidCounter++;
  return '' + uuidCounter;
}

export const ControlPointDefaultData = {
  x: 100,
  y: 100,
  radius: 10,
  color: 0x333333,
};

export interface ControlPointData {
  x: number;
  y: number;
  radius: number;
  color: number;
}

export class ControlPoint {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  uuid = '';
  x = 0;
  y = 0;
  radius = 5;
  color = 0xFFFFFF;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    x: number = 0,
    y: number = 0,
    radius: number = 5,
    color: number = 0xFFFFFF,
  ) {
    this.uuid = getUUID();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
}
