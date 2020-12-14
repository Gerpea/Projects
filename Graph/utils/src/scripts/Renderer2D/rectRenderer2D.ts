import { Color, Point } from '../../base'
import { Renderer2D } from '.'

export class RectRenderer2D extends Renderer2D {
  private width: number
  private height: number

  constructor(context: CanvasRenderingContext2D, color: Color, width: number, height: number) {
    super(context, color)

    this.width = width
    this.height = height
  }

  draw(): void {
    this.context.fillStyle = this.color.toRGBA()

    this.context.moveTo(this.pea.position.x - this.width / 2, this.pea.position.y - this.height / 2)
    this.context.beginPath()

    this.getPoints().forEach((point: Point) => {
      this.context.lineTo(point.x, point.y)
    })

    this.context.closePath()

    this.context.fill()
  }

  private getPoints(): Array<Point> {
    return [
      this.pea.position.plus(
        new Point(-this.width / 2, -this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      this.pea.position.plus(
        new Point(-this.width / 2, this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      this.pea.position.plus(
        new Point(this.width / 2, this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      this.pea.position.plus(
        new Point(this.width / 2, -this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
    ]
  }
}
