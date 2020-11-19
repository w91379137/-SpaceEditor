import { Subject } from 'rxjs';

let uuidCounter = 0;

function getUUID() {
  const id = 'ControlPoint_' + uuidCounter;
  uuidCounter++;
  return id;
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

  private privatex = 0;
  set x(value: number) {
    this.privatex = value;
    this.updateSubject.next(this);
  }
  get x() {
    return this.privatex;
  }

  private privatey = 0;
  set y(value: number) {
    this.privatey = value;
    this.updateSubject.next(this);
  }
  get y() {
    return this.privatey;
  }

  radius = 5;
  color = 0xFFFFFF;

  readonly updateSubject = new Subject<ControlPoint>();

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

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  date() {
    return {
      uuid: this.uuid,
      x: this.x,
      y: this.y,
      radius: this.radius,
      color: this.color,
    };
  }
}
