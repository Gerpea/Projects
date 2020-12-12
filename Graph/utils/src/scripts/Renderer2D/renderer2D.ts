import { Color, Script } from '../../base'

export abstract class Renderer2D extends Script {
  protected context: CanvasRenderingContext2D
  protected color: Color

  constructor(context: CanvasRenderingContext2D, color: Color) {
    super()
    this.context = context
    this.color = color
  }

  onUpdate() {
    this.draw()
  }

  protected abstract draw(): void
}
