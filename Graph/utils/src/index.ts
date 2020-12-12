import { Color, Point, Rotation, Script } from './base'
import { Pea } from './base/pea'
import { PeaEngine } from './base/peaEngine'
import { ChangeAngle } from './scripts/changeAngle'
import { Move } from './scripts/move'
import { EllipseRenderer2D, RectRenderer2D } from './scripts/Renderer2D'

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
const { width, height } = canvas.getBoundingClientRect()

const peaEngine = new PeaEngine()

const background = new Pea(
  'background',
  new Point(width / 2, height / 2),
  new Point(0, 0),
  new Rotation(Math.PI * 2)
)
background.addScript(new RectRenderer2D(context, new Color(127, 127, 127, 1), width, height))
peaEngine.addPea(background)

const redRect = new Pea('red', new Point(0, 0), new Point(0, 0), new Rotation(Math.PI))
const blueRect = new Pea('blue', new Point(0, 0), new Point(0, 0), new Rotation(Math.PI / 4))
const ellipse = new Pea('ellipse', new Point(0, 0), new Point(0, 0), new Rotation(0))

redRect.addChild(blueRect)
blueRect.addChild(ellipse)

peaEngine.addPea(redRect)
peaEngine.addPea(blueRect)
peaEngine.addPea(ellipse)

redRect.addScript(new RectRenderer2D(context, new Color(255, 0, 0, 1), width / 2, height / 2))
blueRect.addScript(new RectRenderer2D(context, new Color(0, 100, 255, 1), 30, 30))
ellipse.addScript(new EllipseRenderer2D(context, new Color(0, 122, 122, 1), 50, 50))

redRect.addScript(
  new Move(
    new Point(width / 2, height / 4),
    new Point(width / 2, height / (4 / 3)),
    new Point(0, 0.5)
  )
)

blueRect.addScript(new ChangeAngle())
blueRect.addScript(new Move(new Point(-50, 0), new Point(50, 0), new Point(0.1, 0.1)))
ellipse.addScript(new ChangeAngle())
