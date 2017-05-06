/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { categories } from '@dlghq/emoji';
import { calculateEmojiCategoryHeight } from './calculator';

export type EmojiCategory = {
  name: string,
  glyph: string,
  chars: string[],
  height: number
};

type Result = {
  categories: EmojiCategory[],
  height: number
};

function createEmojiCategory(name: string, glyph: string, chars: string[]): EmojiCategory {
  return {
    name,
    glyph,
    chars,
    height: calculateEmojiCategoryHeight(chars.length)
  };
}

export function createEmojiCategories(recent: ?(string[])): Result {
  const result = [];
  if (recent && recent.length) {
    result.push(createEmojiCategory('recent', 'schedule', recent));
  }

  result.push(
    createEmojiCategory('people', 'emoji_smile', categories.people),
    createEmojiCategory('nature', 'emoji_nature', categories.nature),
    createEmojiCategory('food', 'emoji_food', categories.foods),
    createEmojiCategory('objects', 'emoji_party', categories.objects),
    createEmojiCategory('travel', 'emoji_travel', categories.places),
    createEmojiCategory('activity', 'emoji_activity', categories.activity),
    createEmojiCategory('symbols', 'emoji_symbols', categories.symbols),
    createEmojiCategory('flags', 'emoji_flag', categories.flags)
  );

  return {
    categories: result,
    height: result.reduce((height, category) => height + category.height, 0)
  };
}
