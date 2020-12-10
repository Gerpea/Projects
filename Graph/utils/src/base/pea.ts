import { Point } from './point'
import { Rotation } from './rotation'
import { Script } from './script'

export class Pea {
  name: string

  position: Point
  center: Point
  rotation: Rotation

  scripts: Set<Script>

  parent!: Pea
  children: Set<Pea>

  constructor(name: string, position: Point, center: Point, rotation: Rotation) {
    this.name = name
    this.position = position
    this.center = center
    this.rotation = rotation

    this.scripts = new Set()

    this.children = new Set()
  }

  addChild(pea: Pea) {
    pea.parent = this
    this.children.add(pea)
  }

  removeChild(pea: Pea) {
    pea.position = pea.position.plus(pea.parent.position)
    pea.parent = pea.parent.parent
  }

  addScript<T extends Script>(script: T): void {
    if (script) {
      this.initScript(script)
    }
  }

  private initScript<T extends Script>(script: T) {
    script.initialize(this)
    this.scripts.add(script)
  }
}
