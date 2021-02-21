import React from 'react'
import './scss/main.scss'

import Chart from './chart/Chart'

function App() {
  return (
    <div className='app'>
      <Chart axis={{ h: 'h', v: 'v' }} />
    </div>
  )
}

export default App
