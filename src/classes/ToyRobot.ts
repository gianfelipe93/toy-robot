import { Direction } from "../global";

export class ToyRobot {
  private _x: number = 0;
  private _y: number = 0;
  private direction: Direction = 'SOUTH';
  private _placed = false

  get x() {
    return this._x
  }

  set x(newX: number) {
    if (this.isCoordenateValid(newX)) {
      this._x = newX;
    }
  }

  get y() {
    return this._y
  }

  set y(newY: number) {
    if (this.isCoordenateValid(newY)) {
      this._y = newY;
    }
  }

  protected isDirectionValid(d: string) {
    return ['NORTH', 'EAST', 'SOUTH', 'WEST'].includes(d);
  }

  public place(x: number, y: number, direction: Direction) {
    if (this.isDirectionValid(direction)) {
      this.direction = direction;
      this._x = this.isCoordenateValid(x) ? x : x > this._x ? 4 : 0;
      this._y = this.isCoordenateValid(y) ? y : y > this._y ? 4 : 0;
    } else {
      console.log('Invalid Direction')
    }
  }

  public report() {
    console.log(`${this._x},${this._y},${this.direction}`)
  }

  protected isCoordenateValid(coordenate: number): boolean {
    return coordenate <= 4 && coordenate >= 0
  }

  public move() {
    switch (this.direction) {
      case "NORTH":
        this.y += 1;
        break;
      case "SOUTH":
        this.y -= 1
        break;
      case "WEST":
        this.x -= 1
        break;
      case "EAST":
        this.x += 1
        break;
    }
  }

  public left() {
    this.rotate('left')
  }

  public right() {
    this.rotate('right')
  }

  protected rotate(rotation: 'left' | 'right') {
    switch (this.direction) {
      case "NORTH":
        this.direction = rotation === 'left' ? 'WEST' : 'EAST'
        break;
      case "SOUTH":
        this.direction = rotation === 'left' ? 'EAST' : 'WEST'
        break;
      case "WEST":
        this.direction = rotation === 'left' ? 'SOUTH' : 'NORTH'
        break;
      case "EAST":
        this.direction = rotation === 'left' ? 'NORTH' : 'SOUTH'
        break;
    }
  }
}