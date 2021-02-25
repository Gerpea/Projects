import { combineReducers } from 'redux'
import * as types from './types'

const initialQuoteState = {
  symbols: [],
}
const quoteReducer = (state = initialQuoteState, { type, payload }) => {
  switch (type) {
    case types.SEARCH_SYMBOL:
      return {
        symbols: payload.map((match) => ({
          symbol: match['1. symbol'],
          name: match['2. name'],
          currency: match['8. currency'],
          price: undefined,
          change: undefined,
          ltd: undefined,
        })),
      }
    case types.FETCH_SYMBOL:
      return {
        symbols: [
          ...state.symbols.map((symbol) => {
            if (symbol.symbol === payload['01. symbol']) {
              return {
                ...symbol,
                price: payload['05. price'],
                change: payload['09. change'],
                ltd: payload['07. latest trading day'],
              }
            } else {
              return symbol
            }
          }),
        ],
      }
    default:
      return state
  }
}

export default combineReducers({ quote: quoteReducer })
