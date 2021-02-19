import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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

  height: 100vh;

  row-gap: 10px;
  padding: 20px;
`

const StyledEditor = styled(CodeMirror)`
  .CodeMirror {
    background: ${({ theme }) => theme.color.secondary.dark};
    color: ${({ theme }) => theme.color.tertiary.base};

    font-size: ${({ theme }) => theme.font.size.m};
    font-family: ${({ theme }) => theme.font.family};

    padding: 10px;

    border: 1px solid ${({ theme }) => theme.color.tertiary.base};
    border-radius: 5px;
  }

  .cm-highlight {
    background: ${({ theme }) => theme.color.secondary.light};
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

const StyledEditorFillSpace = styled(StyledEditor)`
  height: 100%;
  .CodeMirror {
    height: 100% !important;
  }
`

const ErrorMessage = styled.div`
  &:empty::before {
    content: '\\200B';
  }

  width: 100%;
  font-size: ${({ theme }) => theme.font.size.s};
  font-family: ${({ theme }) => theme.font.family};

  color: ${({ theme }) => theme.color.quartary.base};
  text-align: center;
`

function App() {
  const [regexString, setRegexString] = useState('')
  const [testString, setTestString] = useState('')
  const [marks, setMarks] = useState([])
  const [testEditor, setTestEditor] = useState(null)
  const [error, setError] = useState(null)

  let prevMarks = useRef([])

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
    setError('')
    try {
      const flags = regexString.replace(/.*\/(.*)$/, '$1')
      const pattern = regexString.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1')
      const regexp = new XRegExp(pattern, flags)
      const m = []
      testString.split('\n').forEach((value, index) => {
        XRegExp.forEach(value, regexp, (match) => {
          if (match[0].length > 0) {
            m.push({
              from: { ch: match.index, line: index },
              to: { ch: match.index + match[0].length, line: index },
            })
          }
        })
      })
      setMarks(m)
    } catch (e) {
      setError(e.message)
    }
  }, [regexString, testString])

  useEffect(() => {
    prevMarks.current.forEach(({ mark, textMarker }) => {
      textMarker.clear(mark.from, mark.to)
    })

    prevMarks.current = []
    marks.forEach((mark) => {
      prevMarks.current.push({
        mark,
        textMarker: testEditor?.getDoc().markText(mark.from, mark.to, {
          className: 'cm-highlight',
        }),
      })
    })
  }, [marks, testEditor])

  return (
    <StyledApp>
      <ErrorMessage>{error}</ErrorMessage>
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

      <StyledEditorFillSpace
        value={testString}
        options={{
          mode: 'text',
          theme: 'material',
          lineNumbers: false,
          lineWrapping: true,
        }}
        editorDidMount={(editor) => setTestEditor(editor)}
        onChange={(_, __, value) => setTestString(value)}
      />
    </StyledApp>
  )
}

export default App
