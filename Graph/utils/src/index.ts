import { Pea } from './pea'
import { Renderer } from './scripts/renderer'

const firstPea = new Pea('pea1', { x: 0, y: 0 }, { x: 0, y: 0 }, { angle: 0 })
firstPea.addScript(new Renderer())

// class Drawer {
//   private canvas: HTMLCanvasElement
//   private context: CanvasRenderingContext2D

//   constructor(canvas: HTMLCanvasElement) {
//     if (canvas) {
//       this.canvas = canvas!
//     } else {
//       throw new Error('Canvas should not be null')
//     }
//     if (this.canvas.getContext('2d')) {
//       this.context = this.canvas.getContext('2d')!
//     } else {
//       throw new Error("Can't find context")
//     }
//   }
// }

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
