class Drawer {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private step: number
  private elements: Set<DrawerElement>

  constructor(canvas: HTMLCanvasElement) {
    if (canvas) {
      this.canvas = canvas!
    } else {
      throw new Error('Canvas should not be null')
    }
    if (this.canvas.getContext('2d')) {
      this.context = this.canvas.getContext('2d')!
    } else {
      throw new Error("Can't find context")
    }

    this.elements = new Set()
    this.step = 1
  }

  add(element: DrawerElement) {
    console.log('add', element.name)
    this.elements.add(element)
    this.repaint()
  }

  remove(element: DrawerElement) {
    console.log('remove', element.name)
    this.elements.delete(element)
    this.repaint()
  }

  repaint() {
    this.elements.forEach(function (element) {
      const renderer = element.components.find(function (component) {
        return component instanceof Renderer
      }) as Renderer
      if (renderer) {
        renderer.render(element)
      }
    })
  }
}

class DrawerElement {
  name: string

  private position: Point
  private center: Center
  private rotation: Rotation

  components: Array<Component>
  private scripts: Set<Script>

  constructor(name: string, position: Point, center: Center, rotation: Rotation) {
    this.name = name
    this.position = position
    this.center = center
    this.rotation = rotation

    this.components = new Array()
    this.scripts = new Set()
  }
}

type Point = { x: number; y: number }
type Center = { x: number; y: number }
type Rotation = { angle: number }

interface Script {}
interface Component {}

class Trigger implements Component {}
class Renderer implements Component {
  render(element: DrawerElement) {
    console.log(`render: ${element.name}`)
  }
}
class Collider implements Component {}

const drawer = new Drawer(document.getElementById('canvas') as HTMLCanvasElement)
const elementOne = new DrawerElement('elementOne', { x: 0, y: 0 }, { x: 0, y: 0 }, { angle: 0 })
const elementTwo = new DrawerElement('elementTwo', { x: 0, y: 0 }, { x: 0, y: 0 }, { angle: 0 })

elementOne.components.push(new Renderer())

drawer.add(elementOne)
drawer.add(elementTwo)
elementTwo.components.push(new Renderer())
drawer.remove(elementOne)
drawer.remove(elementTwo)

//drawer.step = x
//
//drawer.repaint()
//
//drawer.add(element)
//drawer.remove(element)
//
//drawer.hit({x,y})              // return hitted element
//
//
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
