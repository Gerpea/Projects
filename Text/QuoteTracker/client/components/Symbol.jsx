const Symbol = ({ symbol, price, currency, name, change, ltd }) => {
  return (
    <div key={symbol.symbol} className='symbol p-1'>
      <div className='symbol__left'>
        <p className='fs-l c-tl'>{symbol}</p>
      </div>
      <div className='symbol__center'>
        {price && (
          <p className='fs-m c-tl'>
            {price} {currency}
          </p>
        )}
        <p className='fs-xs c-td'>{name}</p>
      </div>
      <div className='symbol__right'>
        {change && (
          <>
            {change > 0 && <span className='fs-xs c-pd'>&#x25B2;</span>}
            {change < 0 && <span className='fs-xs c-qd'>&#x25BC;</span>}
            <p className={('fs-m', change > 0 ? 'c-p' : change === 0 ? 'c-tl' : 'c-q')}>
              {change} {currency}
            </p>
            <p className='fs-xs c-td'>{ltd}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Symbol
