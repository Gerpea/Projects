import { Color } from './base'
import { Pea } from './base/pea'
import { PeaEngine } from './base/peaEngine'
import { RectRenderer } from './scripts/rectRenderer'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

const peaEngine = new PeaEngine()

const firstPea = new Pea('pea1', { x: 10, y: 30 }, { x: 0, y: 0 }, { angle: 0 })
const secondPea = new Pea('pea2', { x: 20, y: 40 }, { x: 0, y: 0 }, { angle: 0 })

firstPea.addScript(new RectRenderer(context, 50, 50, new Color(255, 0, 0, 1)))
secondPea.addScript(new RectRenderer(context, 50, 50, new Color(0, 0, 255, 1)))

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
