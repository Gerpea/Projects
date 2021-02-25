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
        <p className='fs-s c-t'>{name}</p>
      </div>
      <div className='symbol__right'>
        {change && (
          <>
            <p className={('fs-m', change > 0 ? 'c-p' : 'c-q')}>
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
