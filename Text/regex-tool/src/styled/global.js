import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export default createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
    scroll-behaviour: smooth;
  }

  html {
    overflow: hidden;
  }

  body {
    background: ${({ theme }) => theme.color.secondary.dark};
    color: ${({ theme }) => theme.color.tetrary.base};
    
    fint-size: ${({ theme }) => theme.font.size.base};
    fint-family: ${({ theme }) => theme.font.family};

    overflow: hidden;
    height: 100%;
  }
`
