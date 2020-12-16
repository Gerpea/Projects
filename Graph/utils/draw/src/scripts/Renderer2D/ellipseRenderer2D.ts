import { Renderer2D } from '.'
import { Color } from '../../base'

export class EllipseRenderer2D extends Renderer2D {
  private width: number
  private height: number

  constructor(context: CanvasRenderingContext2D, color: Color, width: number, height: number) {
    super(context, color)

    this.width = width
    this.height = height
  }

  draw(): void {
    this.context.fillStyle = this.color.toRGBA()

    this.context.beginPath()
    this.context.ellipse(
      this.pea.position.x,
      this.pea.position.y,
      this.width / 2,
      this.height / 2,
      this.pea.rotation.radian,
      Math.PI * 2,
      Math.PI
    )
    this.context.closePath()
    this.context.fill()
  }
}
