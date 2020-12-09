import { Script, Point, Color } from '../base'

export class RectRenderer extends Script {
  protected context: CanvasRenderingContext2D

  private _centerPosition!: Point

  private width: number
  private height: number

  private color: Color

  constructor(context: CanvasRenderingContext2D, width: number, height: number, color: Color) {
    super()
    this.context = context
    this.width = width
    this.height = height
    this.color = color
  }

  onStart() {
    this._centerPosition = new Point(this.pea.position.x / 2, this.pea.position.y / 2)
  }

  onUpdate() {
    this.clear()
    this.draw()
  }

  draw(): void {
    this.context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
    this.context.fillRect(this._centerPosition.x, this._centerPosition.y, this.width, this.height)
  }

  clear(): void {
    this.context.clearRect(this._centerPosition.x, this._centerPosition.y, this.width, this.height)
  }
}
