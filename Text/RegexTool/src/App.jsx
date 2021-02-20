import { useEffect, useRef, useState } from 'react'
import XRegExp from 'xregexp'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/addon/display/placeholder'
import debounce from 'lodash.debounce'

import {
  StyledApp,
  ErrorMessage,
  StyledEditorFillSpace,
  StyledEditorSingleLine,
} from './App.styled'

function App() {
  const [regexInput, setRegexInput] = useState('')
  const [testInput, setTestInput] = useState('')

  const [matches, setMatches] = useState([])

  const [editor, setEditor] = useState(null)
  const [error, setError] = useState(null)

  let marks = useRef([])

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

  const searchMatches = useRef(
    debounce((regexString, testString) => {
      try {
        const flags = regexString.replace(/.*\/(.*)$/, '$1')
        const pattern = regexString.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1')
        const regexp = new XRegExp(pattern, flags === pattern ? 'g' : flags)

        const newMatches = []
        testString.split('\n').forEach((value, index) => {
          XRegExp.forEach(value, regexp, (match) => {
            if (match[0].length > 0) {
              newMatches.push({
                from: { ch: match.index, line: index },
                to: { ch: match.index + match[0].length, line: index },
              })
            }
          })
        })
        setMatches(newMatches)
        setError('')
      } catch (e) {
        setError(e.message)
      }
    }, 300)
  ).current

  useEffect(() => {
    searchMatches(regexInput, testInput)
  }, [regexInput, testInput, searchMatches])

  useEffect(() => {
    editor?.operation(() => {
      marks.current.forEach(({ mark, textMarker }) => {
        textMarker.clear(mark.from, mark.to)
      })

      marks.current = []
      matches.forEach((mark) => {
        marks.current.push({
          mark,
          textMarker: editor?.getDoc().markText(mark.from, mark.to, {
            className: 'cm-highlight',
          }),
        })
      })
    })
  }, [matches, editor])

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
          placeholder: 'Enter regexp',
        }}
        onChange={(_, __, value) => {
          setRegexInput(value)
        }}
        onBeforeChange={(_, data, __, next) => {
          preventNL(data)
          next()
        }}
      />

      <StyledEditorFillSpace
        options={{
          mode: 'text',
          theme: 'material',
          lineNumbers: false,
          lineWrapping: true,
          placeholder: 'Enter test string',
        }}
        editorDidMount={(editor) => setEditor(editor)}
        onChange={(_, __, value) => setTestInput(value)}
      />
    </StyledApp>
  )
}

export default App
