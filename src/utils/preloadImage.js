/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');

    image.onload = resolve;
    image.onerror = reject;
    image.src = url;

    if (image.complete) {
      resolve();
    }
  });
}

export default preloadImage;
