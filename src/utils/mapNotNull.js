/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

function mapNotNull<T, R>(array: T[], mapper: (item: T) => ?R): R[] {
  const result: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const value: ?R = mapper(array[i]);
    if (value !== null && typeof value !== 'undefined') {
      result.push(value);
    }
  }

  return result;
}

export default mapNotNull;
