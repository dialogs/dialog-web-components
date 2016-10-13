/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

function selectText(element: HTMLElement): void {
  let range = null;
  let selection = null;

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export default selectText;
