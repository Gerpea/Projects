import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

import BalsamiqSans from '../fonts/BalsamiqSans-Regular.ttf'

export default createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Balsamiq Sans',
    src: local('Balsamiq Sans'), local('BalsamiqSans'), url(${BalsamiqSans}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    scroll-behaviour: smooth;
  }

  html {
    overflow: hidden;
  }

  body {
    overflow: hidden;

    background: ${({ theme }) => theme.color.secondary.dark};
    color: ${({ theme }) => theme.color.tertiary.base};
    
    fint-size: ${({ theme }) => theme.font.size.base};
    fint-family: ${({ theme }) => theme.font.family};

    height: 100vh;
  }
`
