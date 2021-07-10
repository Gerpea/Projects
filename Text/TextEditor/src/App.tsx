import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getCaretCharacterOffsetWithin, proccessKey, setCurrentCursorPosition } from 'Utils';

function App(): React.ReactElement {
  const editorRef = useRef<HTMLDivElement>(null);
  const range = useRef<Range>(document.createRange());

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
  }, [carretPosition]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const carretPosition = getCaretCharacterOffsetWithin(editorRef.current);

    setValue((value) => {
      const newValue = value.slice(0, carretPosition) + e.key + value.slice(carretPosition);

      setCarretPosition((cP) => {
        return cP + 1;
      });

      return newValue;
    });
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleMouseClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
