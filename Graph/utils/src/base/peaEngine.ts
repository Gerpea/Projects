import { Pea } from './pea'

export class PeaEngine {
  private peas: Set<Pea>

  constructor() {
    this.peas = new Set()
    setInterval(this.tick.bind(this), 1000 / 60)
  }

  add(pea: Pea): void {
    this.peas.add(pea)
  }

  remove(pea: Pea): void {
    this.peas.delete(pea)
  }

  private tick(): void {
    this.peas.forEach(function (pea) {
      pea.scripts.forEach(function (script) {
        script.onUpdate()
      })
    })
  }
}
