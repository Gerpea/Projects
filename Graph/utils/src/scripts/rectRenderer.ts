import { Script, Point, Color } from '../base'

export class RectRenderer extends Script {
  protected context: CanvasRenderingContext2D

  private halfPea: Point
  private width: number
  private height: number

  private color: Color

  constructor(context: CanvasRenderingContext2D, width: number, height: number, color: Color) {
    super()
    this.context = context
    this.width = width
    this.height = height
    this.color = color

    this.halfPea = new Point(this.width / 2, this.height / 2)
  }

  onStart() {}

  onUpdate() {
    // this.clear()
    this.draw()
  }

  draw(): void {
    let position = this.getPeaPosition()

    this.context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`

    this.context.moveTo(position.x - this.width / 2, position.y - this.height / 2)

    this.context.beginPath()
    const lb = position.plus(
      new Point(-this.halfPea.x, -this.halfPea.y).rotate(this.pea.center, this.pea.rotation)
    )
    const lt = position.plus(
      new Point(-this.halfPea.x, this.halfPea.y).rotate(this.pea.center, this.pea.rotation)
    )
    const rt = position.plus(
      new Point(this.halfPea.x, this.halfPea.y).rotate(this.pea.center, this.pea.rotation)
    )
    const rb = position.plus(
      new Point(this.halfPea.x, -this.halfPea.y).rotate(this.pea.center, this.pea.rotation)
    )

    this.context.lineTo(lb.x, lb.y)
    this.context.lineTo(lt.x, lt.y)
    this.context.lineTo(rt.x, rt.y)
    this.context.lineTo(rb.x, rb.y)

    this.context.closePath()
    this.context.fill()

    this.context.fillStyle = `rgb(0,255,0)`
    this.context.fillRect(
      this.pea.center.plus(position).x - 5,
      this.pea.center.plus(position).y - 5,
      10,
      10
    )
  }

  clear(): void {
    this.context.clearRect(
      this.pea.position.x - this.width / 2,
      this.pea.position.y - this.height / 2,
      this.width,
      this.height
    )
  }

  getPeaPosition(): Point {
    let position = this.pea.position
    let parent = this.pea.parent
    while (parent) {
      position = position.plus(parent.position)
      parent = parent.parent
    }

    return position
  }
}
