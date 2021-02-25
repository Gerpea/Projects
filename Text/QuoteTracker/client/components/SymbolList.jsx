import { useSelector } from 'react-redux'

import Symbol from './Symbol'

const SymbolList = () => {
  const symbols = useSelector((state) => state.quote.symbols)

  return (
    <div className='symbol-list'>
      {symbols.map((symbol, i) => {
        return <Symbol {...symbol} key={symbol.symbol} />
      })}
    </div>
  )
}

export default SymbolList
