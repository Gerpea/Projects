import { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import ContentEditable from 'react-contenteditable'
import styled from 'styled-components'

const StyledEditable = styled(ContentEditable)`
  height: 100%;
  widht: 100%;

  outline: none;
  border: 1px solid white;
  border-radius: 5px;

  padding: 10px;

  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`

function TestInput({ regexString }) {
  const editable = useRef(null)
  const text = useRef('')

  const updateMatch = useCallback(() => {
    let matches = null
    while ((matches = regexString.exec(text.current)) !== null) {
      console.log(
        `Found ${matches[0]}. Next starts at ${matches.index}. Next ends at ${regexString.lastIndex}`
      )
    }
  }, [regexString])

  const onChange = (e) => {
    text.current = e.target.value
    updateMatch()
  }

  useEffect(() => {
    console.log(regexString)
  }, [regexString])

  return (
    <StyledEditable
      innerRef={editable}
      html={text.current}
      disabled={false}
      onChange={onChange}
      tagName='div'
    />
  )
}

TestInput.propTypes = {
  regexString: PropTypes.object,
}

export default TestInput
