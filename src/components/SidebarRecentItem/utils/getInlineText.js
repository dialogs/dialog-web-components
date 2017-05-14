/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

function getInlineText(text: string): string {
  const eof = text.indexOf('\n');
  if (eof > 0) {
    return text.slice(0, eof);
  }

  return text;
}

export default getInlineText;
