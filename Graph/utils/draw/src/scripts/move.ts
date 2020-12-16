import { Point, Script } from '../base'

export class Move extends Script {
  private incx: boolean = false
  private incy: boolean = false
  private max!: Point | undefined
  private min!: Point | undefined
  private step!: Point | undefined
  private current!: Point | undefined

  constructor(from?: Point, to?: Point, step?: Point) {
    super()
    this.min = from
    this.max = to
    this.step = step
  }

  onStart() {
    this.min = this.min ?? this.pea.position
    this.max = this.max ?? this.pea.position
    this.step = this.step ?? new Point(0, 0)
    this.current = this.max
  }

  onUpdate(): void {
    if (this.current!.x >= this.max!.x) {
      this.incx = false
    } else if (this.current!.x <= this.min!.x) {
      this.incx = true
    }

    if (this.current!.y >= this.max!.y) {
      this.incy = false
    } else if (this.current!.y <= this.min!.y) {
      this.incy = true
    }

    this.current = new Point(
      this.incx ? this.current!.x + this.step!.x : this.current!.x - this.step!.x,
      this.incy ? this.current!.y + this.step!.y : this.current!.y - this.step!.y
    )
    this.pea.position = this.current
  }
}
