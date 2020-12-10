import { Color, Point, Rotation, Script } from './base'
import { Pea } from './base/pea'
import { PeaEngine } from './base/peaEngine'
import { RectRenderer } from './scripts/rectRenderer'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

const peaEngine = new PeaEngine()

const firstPea = new Pea('pea1', new Point(250, 150), new Point(0, 0), { angle: Math.PI / 4 })
const secondPea = new Pea('pea2', new Point(250, 150), new Point(0, 0), { angle: Math.PI / 4 })

class ChangeAngle extends Script {
  private inc: boolean = false
  private max: number = Math.PI / 3
  private min: number = -Math.PI / 3
  private step: number = Math.PI / 180
  private angle: number = this.max

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

class ChangeCenter extends Script {
  private inc: boolean = false
  private max: number = 25
  private min: number = -25
  private step: number = 1
  private center: number = this.max

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

firstPea.addScript(new RectRenderer(context, 100, 100, new Color(255, 0, 0, 1)))
secondPea.addScript(new RectRenderer(context, 50, 50, new Color(0, 0, 255, 1)))
secondPea.addScript(new ChangeAngle())
secondPea.addScript(new ChangeCenter())

peaEngine.add(firstPea)
peaEngine.add(secondPea)

//element.position = {x, y}      // default: 0, 0
//element.rotation = r           // default: 0
//element.center = {x%, y%}      // default: 0.0, 0.0
//
//element.components ???
//element.scripts = <Script>[]
//
//element.name                   // for finding element in drawer
//
//
//camera.position = {x, y}
//camera.zoom = z
//
//
