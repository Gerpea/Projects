import { Script } from './scripts/script'
import { Center, Point, Rotation } from './types'

export class Pea {
  name: string

  position: Point
  center: Center
  rotation: Rotation

  scripts: Set<Script>

  constructor(name: string, position: Point, center: Center, rotation: Rotation) {
    this.name = name
    this.position = position
    this.center = center
    this.rotation = rotation

    this.scripts = new Set()
  }

  addScript<T extends Script>(script: T): void {
    console.log(script)
  }
}
