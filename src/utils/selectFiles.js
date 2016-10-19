/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function selectFiles(callback: (files: File[]) => void, multiple?: boolean) {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = multiple || true;
  input.onchange = () => {
    input.onchange = null;
    callback(Array.from(input.files));
  };

  input.click();
}

export default selectFiles;
