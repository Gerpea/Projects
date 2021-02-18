import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { getBgColor, getColor, getFontSize } from '../styled/utils'

const StyledInput = styled.input`
  font-family: inherit;
  font-size: ${(props) => getFontSize(props)};

  color: ${(props) => getColor(props)};
  background: ${(props) => getBgColor(props)};

  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;

  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary.base};
  }

  &:after {
    content: '/';
  }

  &:before {
    content: '/';
  }
`

function RegexInput(props) {
  const onChange = (e) => {
    let regex = RegExp('')
    try {
      regex = RegExp(e.target.value, 'g')
    } catch (_) {}

    props.onChange?.call(undefined, regex)
  }

  return <StyledInput onChange={onChange} type='text' />
}

RegexInput.propTypes = {
  onChange: PropTypes.func,
}

export default RegexInput
