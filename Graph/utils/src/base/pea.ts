import { Renderer2D } from '../scripts/Renderer2D'
import { Trigger2D } from '../scripts/trigger2D'
import { Point } from './point'
import { Rotation } from './rotation'
import { Script } from './script'

export class Pea {
  private _name: string

  private _position: Point
  private _center: Point
  private _rotation: Rotation

  renderers: Set<Renderer2D>
  triggers: Set<Trigger2D>
  scripts: Set<Script>

  parent!: Pea
  children: Set<Pea>

  constructor(name: string, position: Point, center: Point, rotation: Rotation) {
    this._name = name
    this._position = position
    this._center = center
    this._rotation = rotation

    this.scripts = new Set()
    this.renderers = new Set()
    this.triggers = new Set()

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

  get name(): string {
    return this.name
  }
  get position(): Point {
    let position = this._position
    let parent = this.parent
    while (parent) {
      position = position.plus(parent._position)
      parent = parent.parent
    }

    return position
  }

  get center(): Point {
    return this._center
  }
  get rotation(): Rotation {
    return this._rotation
  }

  set name(value: string) {
    this._name = value
  }
  set position(value: Point) {
    this._position = value
  }
  set center(value: Point) {
    this._center = value
  }
  set rotation(value: Rotation) {
    this._rotation = value
  }

  private initScript<T extends Script>(script: T) {
    script.initialize(this)
    if (script instanceof Renderer2D) {
      this.renderers.add(script)
    } else if (script instanceof Trigger2D) {
      this.triggers.add(script)
    } else {
      this.scripts.add(script)
    }
  }
}
