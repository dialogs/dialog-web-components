/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import getImageSize from '../getImageSize';

describe('getImageSize', () => {
  test('should return same size when sizes smaller then maximum values', () => {
    expect(getImageSize(100, 100, 200, 100)).toEqual({ width: 100, height: 100 });
  });

  test('should return same size when sizes maximum values is null', () => {
    expect(getImageSize(100, 200, null, null)).toEqual({ width: 100, height: 200 });
  });

  test('should return same size when sizes maximum values is undefined', () => {
    expect(getImageSize(300, 200)).toEqual({ width: 300, height: 200 });
  });

  test('should return correct size when width bigger then maxWidth', () => {
    expect(getImageSize(250, 50, 200, 100)).toEqual({ width: 200, height: 40 });
  });

  test('should return correct size when height bigger then maxHeight', () => {
    expect(getImageSize(200, 150, 200, 100)).toEqual({ width: 133.33333333333331, height: 100 });
  });
});
