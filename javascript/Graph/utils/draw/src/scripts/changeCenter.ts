import { Script } from '../base'

export class ChangeCenter extends Script {
  private inc: boolean = false
  private max: number = 25
  private min: number = -25
  private step: number = 1
  private center: number = this.max

  constructor(from?: number, to?: number, step?: number) {
    super()
    this.min = from ?? this.min
    this.max = to ?? this.max
    this.step = step ?? this.step
  }

  onUpdate(): void {
    if (this.center >= this.max) {
      this.inc = false
    } else if (this.center <= this.min) {
      this.inc = true
    }

    this.center = this.inc ? this.center + this.step : this.center - this.step
    this.pea.center.x = this.center
  }
}
