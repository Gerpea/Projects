import styled from 'styled-components'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;

  row-gap: ${({ theme }) => theme.space.v.s};
  padding: ${({ theme }) => theme.space.v.m} ${({ theme }) => theme.space.h.m};
`

const StyledEditor = styled(CodeMirror)`
  flex-grow: 0;

  .CodeMirror {
    background: ${({ theme }) => theme.color.secondary.dark};
    color: ${({ theme }) => theme.color.tertiary.base};

    font-size: ${({ theme }) => theme.font.size.m};
    font-family: ${({ theme }) => theme.font.family};

    padding: ${({ theme }) => theme.space.v.xs} ${({ theme }) => theme.space.h.xs};

    border: 1px solid ${({ theme }) => theme.color.tertiary.base};
    border-radius: 5px;
  }

  .CodeMirror-focused {
    border-color: ${({ theme }) => theme.color.primary.base};
  }

  .CodeMirror pre.CodeMirror-placeholder {
    color: ${({ theme }) => theme.color.tertiary.dark};
  }

  .cm-highlight {
    color: ${({ theme }) => theme.color.primary.light};
  }
`

const StyledEditorSingleLine = styled(StyledEditor)`
  .CodeMirror {
    height: auto;
  }
`

const StyledEditorFillSpace = styled(StyledEditor)`
  height: 100%;
  overflow: hidden;

  .CodeMirror {
    height: 100% !important;
  }
`

const ErrorMessage = styled.div`
  &:empty::before {
    content: '\\200B';
  }

  font-size: ${({ theme }) => theme.font.size.xl};
  font-family: ${({ theme }) => theme.font.family};

  color: ${({ theme }) => theme.color.quartary.light};
  text-align: center;

  width: 100%;
`

export { StyledApp, ErrorMessage, StyledEditorFillSpace, StyledEditorSingleLine }
