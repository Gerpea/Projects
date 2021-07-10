import { ModifierKeys } from 'Constants/keys';

const ignoredKeys: string[] = new Array<string>(...ModifierKeys);

export function proccessKey(key: string): string {
  if (ignoredKeys.includes(key)) {
    return '';
  }
  switch (key) {
    case '<':
      return '&#60;';
    case '>':
      return '&#62;';
    default:
      return key;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getCaretCharacterOffsetWithin(element: any): number {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection != 'undefined') {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type != 'Control') {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }

  return caretOffset;
}

export function setCurrentCursorPosition(el: Element, count: number, range: Range): void {
  if (count >= 0) {
    const selection = window.getSelection();
    range.setStart(el as Node, count);
    range.collapse(true);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
