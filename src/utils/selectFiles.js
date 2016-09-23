/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function selectFiles(callback: (files: File[]) => void) {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = () => {
    input.onchange = null;
    callback(Array.from(input.files));
  };

  input.click();
}

export default selectFiles;
