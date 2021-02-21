import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

function useElementSize(refEl: React.MutableRefObject<HTMLElement | undefined>) {
  const [size, setSize] = useState([0, 0])

  const updateSize = useCallback(() => {
    const el = refEl.current
    if (el) {
      const { width, height } = el.getBoundingClientRect()
      setSize([width, height])
    }
  }, [refEl])

  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(() => {
        updateSize()
      })
      if (refEl.current) {
        resizeObserver.observe(refEl.current)
      }
      return () => resizeObserver.disconnect()
    } else {
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [refEl.current])

  return size
}

export default useElementSize
