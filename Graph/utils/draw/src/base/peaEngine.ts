import { Pea } from './pea'
import { Point } from './point'
import { Rotation } from './rotation'

export class PeaEngine {
  private peas: Set<Pea>

  constructor() {
    this.peas = new Set()
    setInterval(this.tick.bind(this), 1000 / 60)
  }

  addPea(pea: Pea): void {
    if (!pea.parent) {
      pea.parent = new Pea('', new Point(0, 0), new Point(0, 0), new Rotation(0))
    }
    this.peas.add(pea)
  }

  removePea(pea: Pea): void {
    this.peas.delete(pea)
  }

  private tick(): void {
    this.peas.forEach(function (pea) {
      pea.renderers.forEach(function (renderer) {
        renderer.draw()
      })

      pea.scripts.forEach(function (script) {
        script.onUpdate()
      })
    })
  }
}
