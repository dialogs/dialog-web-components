/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import calculateCursor from '../calculateCursor';

describe('calculateCursor', () => {
  const min = 0;
  const max = 2;

  it('should correctly calculate cursor', () => {
    expect(calculateCursor({ min, max, next: min - 1 })).toBe(min);
    expect(calculateCursor({ min, max, next: min })).toBe(min);
    expect(calculateCursor({ min, max, next: 1 })).toBe(1);
    expect(calculateCursor({ min, max, next: max })).toBe(max);
    expect(calculateCursor({ min, max, next: max + 1 })).toBe(max);
  });

  it('should correctly calculate looped cursor', () => {
    const looped = true;
    expect(calculateCursor({ min, max, looped, next: min - 1 })).toBe(max);
    expect(calculateCursor({ min, max, looped, next: min })).toBe(min);
    expect(calculateCursor({ min, max, looped, next: 1 })).toBe(1);
    expect(calculateCursor({ min, max, looped, next: max })).toBe(max);
    expect(calculateCursor({ min, max, looped, next: max + 1 })).toBe(min);
  });
});
