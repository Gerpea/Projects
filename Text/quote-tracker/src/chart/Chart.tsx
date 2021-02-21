import { useEffect, useLayoutEffect, useRef } from 'react'
import useElementSize from './hooks/useElementSize'

import './scss/main.scss'

function Chart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, height] = useElementSize(canvasRef as React.MutableRefObject<HTMLElement>)

  useEffect(() => {
    console.log("i'm mount")
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      resize(canvasRef.current)
    }
  }, [width, height])

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

export default Chart
