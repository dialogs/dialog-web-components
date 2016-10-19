/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function fileToBase64(file: File, callback: (dataUri: string) => void): void {
  const reader = new FileReader();
  reader.onload = (event) => callback(event.target.result);
  reader.readAsDataURL(file);
}

export default fileToBase64;
