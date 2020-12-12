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

  protected draw(): void {
    this.context.fillStyle = this.color.toRGBA()

    this.context.moveTo(this.pea.position.x - this.width / 2, this.pea.position.y - this.height / 2)
    this.context.beginPath()

    const { lb, lt, rb, rt } = this.getPoints()

    this.context.lineTo(lb.x, lb.y)
    this.context.lineTo(lt.x, lt.y)
    this.context.lineTo(rt.x, rt.y)
    this.context.lineTo(rb.x, rb.y)
    this.context.closePath()

    this.context.fill()
  }

  private getPoints(): { lb: Point; lt: Point; rt: Point; rb: Point } {
    return {
      lb: this.pea.position.plus(
        new Point(-this.width / 2, -this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      lt: this.pea.position.plus(
        new Point(-this.width / 2, this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      rt: this.pea.position.plus(
        new Point(this.width / 2, this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
      rb: this.pea.position.plus(
        new Point(this.width / 2, -this.height / 2).rotate(this.pea.center, this.pea.rotation)
      ),
    }
  }
}
