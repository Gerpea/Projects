import { Script, Point } from '../base'

export class RectRenderer extends Script {
  protected context: CanvasRenderingContext2D

  private centerPosition!: Point

  private width: number
  private height: number

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    super()
    this.context = context
    this.width = width
    this.height = height
  }

  onStart() {
    this.centerPosition = new Point(this.pea.position.x / 2, this.pea.position.y / 2)
  }

  onUpdate() {
    this.clear()
    this.draw()
  }

  draw(): void {
    this.context.fillRect(this.centerPosition.x, this.centerPosition.y, this.width, this.height)
  }

  clear(): void {
    this.context.clearRect(this.centerPosition.x, this.centerPosition.y, this.width, this.height)
  }
}
