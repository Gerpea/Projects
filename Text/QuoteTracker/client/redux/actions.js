import * as types from './types'
import debounce from 'lodash.debounce'

export const fetchSymbol = (symbol) => (dispatch) =>
  symbol.length > 0
    ? fetch(`http://localhost:5000/api/query?function=GLOBAL_QUOTE&symbol=${symbol}`)
        .then((res) => res.json())
        .then((data) => {
          if (data['Global Quote']) {
            dispatch({ type: types.FETCH_SYMBOL, payload: data['Global Quote'] })
          }
        })
        .catch((e) => console.log(e))
    : undefined

const fetchQuotes = debounce((dispatch, keywords) => {
  if (keywords.length > 0) {
    fetch(`http://localhost:5000/api/query?function=SYMBOL_SEARCH&keywords=${keywords}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.bestMatches) {
          dispatch({ type: types.SEARCH_SYMBOL, payload: data.bestMatches || [] })
          data.bestMatches.forEach((match, i) =>
            setTimeout(() => dispatch(fetchSymbol(match['1. symbol'])), ((1000 * 60) / 5) * i)
          )
        }
      })
      .catch((e) => console.log(e))
  } else {
  }
}, 300)

export const searchQuotes = (keywords) => (dispatch) => fetchQuotes(dispatch, keywords)
export const clearQuotes = () => (dispatch) => dispatch({ type: types.SEARCH_SYMBOL, payload: [] })
