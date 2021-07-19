import React, { useState, useEffect, useCallback, useRef } from 'react';
import KeyProcessor from 'Service/KeyProcessor';
import { getCaretCharacterOffsetWithin, setCurrentCursorPosition } from 'Utils';

function App(): React.ReactElement {
  const editorRef = useRef<HTMLDivElement>(null);
  const range = useRef<Range>(document.createRange());
  const keyProcessor = useRef<KeyProcessor>(new KeyProcessor());

  const [carretPosition, setCarretPosition] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (editorRef.current?.childNodes[0]) {
      setCurrentCursorPosition(
        editorRef.current?.childNodes[0] as Element,
        carretPosition,
        range.current,
      );
    }
  }, [carretPosition, value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const carretPosition = getCaretCharacterOffsetWithin(editorRef.current);

    setValue((value) => {
      let newValue: string = value;

      keyProcessor.current.processKey(e.key);

      if (e.key === 'Backspace') {
        newValue = value.slice(0, carretPosition - 1) + value.slice(carretPosition);
        setCarretPosition((cP) => Math.max(0, cP - 1));
      } else if (e.key === 'Delete') {
        newValue = value.slice(0, carretPosition) + value.slice(carretPosition + 1);
      } else {
        newValue =
          value.slice(0, carretPosition) +
          keyProcessor.current.processKey(e.key) +
          value.slice(carretPosition);
        setCarretPosition((cP) => Math.min(cP + 1, newValue.length));
      }

      return newValue;
    });
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleMouseClick = useCallback(() => {
    setCarretPosition(getCaretCharacterOffsetWithin(editorRef.current));
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable={true}
      dangerouslySetInnerHTML={{ __html: value }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={handleMouseClick}
    />
  );
}

export default App;
