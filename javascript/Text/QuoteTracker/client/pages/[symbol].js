import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { useResizeDetector } from 'react-resize-detector'
import { clearQuotes } from '../redux/actions'

const Symbol = ({ prices, symbol, name, currency, description, country, sector, industry }) => {
  const { width, height: containerHeight, ref: containerRef } = useResizeDetector()
  const [height, setHeight] = useState(350)
  const dispatch = useDispatch()

  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      animations: {
        enabled: false,
      },
      fontFamily: "'Balsamiq Sans', cursive",
      foreColor: 'hsl(0, 2%, 49%)',
      toolbar: {
        show: false,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
    },
    title: {
      text: currency ? `${symbol}, ${currency}` : symbol,
      align: 'center',
      offsetX: 0,
      offsetY: 0,
      floating: true,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      borderColor: 'hsl(0, 8%, 31%)',
    },
    tooltip: {
      x: {
        format: 'dd MMM y',
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: 'hsl(113, 88%, 23%)',
          downward: 'hsl(2, 87%, 40%)',
        },
        wick: {
          useFillColor: true,
        },
      },
    },
  })

  useEffect(() => {
    dispatch(clearQuotes())
  }, [])

  useEffect(() => {
    let w = 350
    try {
      const style = window.getComputedStyle(containerRef.current, null)
      w = parseInt(style.getPropertyValue('width'), 10)
      w -= parseInt(style.getPropertyValue('margin-top'), 10)
      w -= parseInt(style.getPropertyValue('margin-bottom'), 10)
      w -= parseInt(style.getPropertyValue('padding-top'), 10)
      w -= parseInt(style.getPropertyValue('padding-bottom'), 10)
    } catch (e) {
      w = parseInt(containerRef.current.currentStyle.width, 10)
      w -= parseInt(containerRef.current.currentStyle.marginTop, 10)
      w -= parseInt(containerRef.current.currentStyle.marginBottom, 10)
      w -= parseInt(containerRef.current.currentStyle.paddingTop, 10)
      w -= parseInt(containerRef.current.currentStyle.paddingBottom, 10)
    }
    setHeight(w / 1.618)
  }, [containerRef.current, width, containerHeight])
  return (
    <div
      className={`p-3 ${!description && !name ? 'va-c' : ''}`}
      style={{ height: !description && !name ? '100vh' : undefined }}
      ref={containerRef}>
      <div className='card pf-1'>
        <Chart
          options={options}
          series={[
            {
              data: prices.map((price) => ({
                x: new Date(price.x),
                y: price.y,
              })),
            },
          ]}
          type='candlestick'
          height={height}
        />
      </div>
      {description && name && (
        <div className='card pf-3 mtf-5'>
          <div className='col mbf-1 ta-c card__header'>
            <p className='mbf-1 fs-xl c-tl'>{name}</p>
            <p className='fs-m c-t'>{symbol}</p>
          </div>
          <div className='card__body mbf-2'>
            <p className='fs-s c-tl'>{description}</p>
          </div>
          <div className='row card__footer fs-s c-td'>
            <p>{country}</p>
            <p>{sector}</p>
            <p>{industry}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { symbol } = context.params

  const overview = await fetch(
    `http://localhost:5000/api/query?function=OVERVIEW&symbol=${symbol}`
  ).then(async (res) => res.json())

  const prices = await fetch(
    `http://localhost:5000/api/query?function=TIME_SERIES_DAILY&symbol=${symbol}`
  ).then((res) => res.json())

  if (
    (!overview && !prices) ||
    (Object.keys(overview).length === 0 && Object.keys(prices).length === 0) ||
    !prices['Time Series (Daily)'] ||
    prices['Time Series (Daily)']?.length < 1
  ) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      symbol: overview['Symbol'] || symbol,
      name: overview['Name'] || null,
      description: overview['Description'] || null,
      currency: overview['Currency'] || null,
      country: overview['Country'] || null,
      sector: overview['Sector'] || null,
      industry: overview['Industry'] || null,
      prices: Object.keys(prices['Time Series (Daily)']).map((time) => ({
        x: Date.parse(time),
        y: [
          prices['Time Series (Daily)'][time]['1. open'],
          prices['Time Series (Daily)'][time]['2. high'],
          prices['Time Series (Daily)'][time]['3. low'],
          prices['Time Series (Daily)'][time]['4. close'],
        ],
      })),
    },
  }
}

export default Symbol
