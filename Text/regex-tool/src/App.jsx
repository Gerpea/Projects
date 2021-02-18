import { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import XRegExp from 'xregexp'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/xml/xml')
require('codemirror/mode/javascript/javascript')

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
`

const StyledEditor = styled(CodeMirror)`
  .CodeMirror {
    background: ${({ theme }) => theme.color.secondary.dark};
    color: ${({ theme }) => theme.color.tetrary.base};

    font-size: ${({ theme }) => theme.font.size.m};
    font-family: ${({ theme }) => theme.font.family};

    padding: 10px;

    border: 1px solid ${({ theme }) => theme.color.tetrary.base};
    border-radius: 5px;
  }

  .CodeMirror-focused {
    border-color: ${({ theme }) => theme.color.primary.base};
  }
`

const StyledEditorSingleLine = styled(StyledEditor)`
  .CodeMirror {
    height: auto;
  }
`

function App() {
  const [regexString, setRegexString] = useState('')
  const [testString, setTestString] = useState('')
  const testEditor = useRef(null)

  const preventNL = (data) => {
    const typedNewLine =
      data.origin === '+input' && typeof data.text === 'object' && data.text.join('') === ''
    if (typedNewLine) {
      return data.cancel()
    }

    const pastedNewLine =
      data.origin === 'paste' && typeof data.text == 'object' && data.text.length > 1
    if (pastedNewLine) {
      const newText = data.text.join(' ')

      return data.update(null, null, [newText])
    }

    return null
  }

  useEffect(() => {
    console.log('call')
    try {
      const regexp = new XRegExp(regexString)
      testString.split('\n').forEach((value, index) => {
        XRegExp.forEach(value, regexp, (match) => {
          console.log(`line: ${index}, from: ${match.index}, to: ${match.index + match[0].length}`)
        })
      })
    } catch (e) {}
  }, [regexString, testString])

  return (
    <StyledApp>
      <StyledEditorSingleLine
        options={{
          mode: 'text',
          theme: 'material',
          lineNumbers: false,
          lineWrapping: false,
          viewportMargin: Infinity,
          scrollbarStyle: null,
        }}
        onChange={(_, __, value) => {
          setRegexString(value)
        }}
        onBeforeChange={(_, data, __, next) => {
          preventNL(data)
          next()
        }}
      />

      <StyledEditor
        ref={testEditor}
        value={testString}
        options={{
          mode: 'text',
          theme: 'material',
          lineNumbers: false,
          lineWrapping: true,
        }}
        onChange={(_, __, value) => setTestString(value)}
      />
    </StyledApp>
  )
}

export default App
