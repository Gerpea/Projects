import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import SymbolCard from './SymbolCard'

const SymbolList = () => {
  const symbols = useSelector((state) => state.quote.symbols)

  return (
    <div className='symbol-list'>
      {symbols.map((symbol, i) => {
        return (
          <Link href={`/${symbol.symbol}`} key={symbol.symbol} passHref>
            <a>
              <SymbolCard {...symbol} />
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default SymbolList
