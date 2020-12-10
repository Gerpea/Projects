import { Color, Point, Rotation, Script } from './base'
import { Pea } from './base/pea'
import { PeaEngine } from './base/peaEngine'
import { ChangeAngle } from './scripts/changeAngle'
import { ChangeCenter } from './scripts/changeCenter'
import { EllipseRenderer } from './scripts/ellipseRenderer'
import { Move } from './scripts/move'
import { RectRenderer } from './scripts/rectRenderer'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
const { width, height } = canvas.getBoundingClientRect()

const peaEngine = new PeaEngine()

const background = new Pea('background', new Point(width / 2, height / 2), new Point(0, 0), {
  angle: Math.PI * 2,
})

const firstPea = new Pea('pea1', new Point(0, 0), new Point(0, 0), {
  angle: Math.PI,
})
const secondPea = new Pea('pea2', new Point(0, 0), new Point(0, 0), { angle: 0 })
const thirdPea = new Pea('pea3', new Point(250, 150), new Point(0, 0), { angle: Math.PI * 2 })
const fourthPea = new Pea('pea4', new Point(350, 150), new Point(0, 0), { angle: Math.PI / 4 })
const fifthPea = new Pea('pea5', new Point(0, 0), new Point(0, 0), { angle: Math.PI / 4 })

firstPea.addChild(fifthPea)
fifthPea.addChild(secondPea)

peaEngine.addPea(background)
peaEngine.addPea(firstPea)
peaEngine.addPea(fifthPea)
peaEngine.addPea(secondPea)

background.addScript(new RectRenderer(context, width, height, new Color(127, 127, 127, 1)))
firstPea.addScript(new RectRenderer(context, width / 2, height / 2, new Color(255, 0, 0, 1)))
fifthPea.addScript(new RectRenderer(context, 30, 30, new Color(0, 100, 255, 1)))

firstPea.addScript(
  new Move(
    new Point(width / 2, height / 4),
    new Point(width / 2, height / (4 / 3)),
    new Point(0, 0.5)
  )
)
fifthPea.addScript(new ChangeAngle())
fifthPea.addScript(new Move(new Point(-50, 0), new Point(50, 0), new Point(0.1, 0.1)))

secondPea.addScript(new EllipseRenderer(context, 50, 50, new Color(0, 122, 122, 1)))
thirdPea.addScript(new RectRenderer(context, 50, 50, new Color(0, 0, 255, 1)))
fourthPea.addScript(new RectRenderer(context, 50, 50, new Color(0, 0, 255, 1)))

secondPea.addScript(new ChangeAngle())

thirdPea.addScript(new ChangeCenter())

fourthPea.addScript(new ChangeAngle())
fourthPea.addScript(new ChangeCenter())

// peaEngine.addPea(secondPea)
// peaEngine.addPea(thirdPea)
// peaEngine.addPea(fourthPea)
