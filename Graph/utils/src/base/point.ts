import { Rotation } from '.'

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  rotate(pivot: Point, rotation: Rotation): Point {
    const sin = Math.sin(rotation.angle)
    const cos = Math.cos(rotation.angle)

    const sp = this.minus(pivot)

    const xnew = sp.x * cos - sp.y * sin
    const ynew = sp.x * sin + sp.y * cos

    return new Point(xnew + pivot.x, ynew + pivot.y)
  }

  minus(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y)
  }

  plus(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y)
  }
}
