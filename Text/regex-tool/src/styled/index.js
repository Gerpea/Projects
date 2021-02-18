import styled from 'styled-components'

import theme from './theme'
import global from './global'
import { getColor, getFontSize } from './utils'

export const VerticalList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const Label = styled.label`
  font-family: inherit;
  font-size: ${(props) => getFontSize(props)};

  color: ${(props) => getColor(props)};
`

export { theme, global }
