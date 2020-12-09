import { Point } from './point'
import { Rotation } from './rotation'
import { Script } from './script'

export class Pea {
  name: string

  position: Point
  center: Point
  rotation: Rotation

  scripts: Set<Script>

  constructor(name: string, position: Point, center: Point, rotation: Rotation) {
    this.name = name
    this.position = position
    this.center = center
    this.rotation = rotation

    this.scripts = new Set()
  }

  addScript<T extends Script>(script: T): void {
    script.initialize(this)
    this.scripts.add(script)
  }
}
