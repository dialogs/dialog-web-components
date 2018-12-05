/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import getAvatarText from '../getAvatarText';

describe('getAvatarText', () => {
  test('should return two letter from two words', () => {
    expect(getAvatarText('Test User')).toEqual('TU');
  });

  test('should return two letter from more than two words', () => {
    expect(getAvatarText('Test User With Three Word')).toEqual('TU');
  });

  test('should return one letter from one word', () => {
    expect(getAvatarText('Test')).toEqual('T');
  });

  test('should return one letter from two word even if there multiple spacebars', () => {
    expect(getAvatarText('Test    User')).toEqual('TU');
  });

  test('should return hash if is only emoji in the title', () => {
    expect(getAvatarText('🦕🦖')).toEqual('#');
  });

  test('should remove emoji from title return as it normal text', () => {
    expect(getAvatarText('🦕 Hello 🦖')).toEqual('H');
    expect(getAvatarText('🦕 Hello World 🦖')).toEqual('HW');
  });
});
