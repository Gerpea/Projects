export class Rotation {
  private _radian: number

  constructor(radians: number) {
    this._radian = radians
  }

  get radian(): number {
    return this._radian
  }

  set radian(value: number) {
    this._radian = value
  }
}
