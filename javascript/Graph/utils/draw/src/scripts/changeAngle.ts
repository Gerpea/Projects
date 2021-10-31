import { Rotation, Script } from '../base'

export class ChangeAngle extends Script {
  private inc: boolean = false
  private max: number = Math.PI / 3
  private min: number = -Math.PI / 3
  private step: number = Math.PI / 180
  private angle: number = this.max

  constructor(from?: number, to?: number, step?: number) {
    super()
    this.min = from ? from % (Math.PI * 2) : this.min
    this.max = to ? to % (Math.PI * 2) : this.max
    this.step = step ? step % (Math.PI * 2) : this.step
  }

  onUpdate(): void {
    if (this.angle >= this.max) {
      this.inc = false
    } else if (this.angle <= this.min) {
      this.inc = true
    }

    this.angle = this.inc ? this.angle + this.step : this.angle - this.step
    this.pea.rotation = new Rotation(this.angle)
  }
}
