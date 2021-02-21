import { element } from 'prop-types'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useElementSize from './hooks/useElementSize'

import './scss/main.scss'

interface ChartProps extends React.HTMLAttributes<HTMLCanvasElement> {
  axis?: {
    v: String
    h: String
  }
  data?: Array<{
    v: Array<number>
    h: Array<number>
  }>
}

//TODO: useCallback
const Chart = ({ axis, data }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, height] = useElementSize(canvasRef as React.MutableRefObject<HTMLElement>)

  const [elements, setElements] = useState<Array<DrawElement>>([])
  const canvas = useRef<DrawCanvas>()

  useEffect(() => {
    console.log("i'm mount")
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const ctx2d = canvasRef.current.getContext('2d')
      if (ctx2d) {
        canvas.current = new DrawCanvas(ctx2d)
      }
    }
  }, [canvasRef.current])

  useEffect(() => {
    if (canvasRef.current) {
      resize(canvasRef.current)
      console.log(width, height)
      canvas.current?.draw(elements)
    }
  }, [width, height])

  useEffect(() => {
    canvas.current?.draw(elements)
  }, [elements])

  useEffect(() => {
    const newElements: Array<DrawElement> = []
    if (axis) {
      newElements.push(new DrawLine({ x: 10, y: 0 }, { x: 10, y: height }))
      newElements.push(new DrawLine({ x: 0, y: 10 }, { x: width, y: 10 }))
    }
    data?.forEach((d) => {
      d.h.map((v, i) => {
        newElements.push(new DrawLine({ x: v, y: d.v[i] }, { x: v, y: d.v[i] }))
      })
    })
    setElements(newElements)
  }, [width, height, axis, data])

  return <canvas ref={canvasRef} className={'chart-canvas'}></canvas>
}

function resize(canvas: HTMLCanvasElement): void {
  const { width, height } = canvas.getBoundingClientRect()
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window
    const context = canvas.getContext('2d')
    if (context != null) {
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.scale(ratio, ratio)
    }
  }
}

class DrawCanvas {
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  draw(elements: Array<DrawElement>): void {
    this.clear()
    this.render(elements)
  }
  render(elements: Array<DrawElement>): void {
    elements.forEach((element) => {
      element.render(this.ctx, { x: 0, y: this.ctx.canvas.height })
    })
  }
  clear(): void {}
}
interface DrawPoint {
  readonly x: number
  readonly y: number
}
abstract class DrawElement {
  pos: DrawPoint

  constructor(pos: DrawPoint) {
    this.pos = pos
  }

  render(ctx: CanvasRenderingContext2D, offset: DrawPoint = { x: 0, y: 0 }): void {}
}

class DrawLine extends DrawElement {
  end: DrawPoint

  constructor(start: DrawPoint, end: DrawPoint) {
    super(start)
    this.end = end
  }

  render(ctx: CanvasRenderingContext2D, offset: DrawPoint = { x: 0, y: 0 }): void {
    console.log(`start: ${this.pos.x + offset.x}, ${offset.y - this.pos.y}`)
    console.log(`end: ${this.end.x + offset.x}, ${offset.y - this.end.y}`)
    ctx.beginPath()
    ctx.moveTo(this.pos.x + offset.x, offset.y - this.pos.y)
    ctx.lineTo(this.end.x + offset.x, offset.y - this.end.y)
    ctx.stroke()
  }
}

export default Chart
