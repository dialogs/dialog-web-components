/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import { categories } from '@dlghq/emoji';

export default [
  { name: 'people', glyph: 'emoji_smile', chars: categories.people },
  { name: 'nature', glyph: 'emoji_nature', chars: categories.nature },
  { name: 'foods', glyph: 'emoji_food', chars: categories.foods },
  { name: 'objects', glyph: 'emoji_party', chars: categories.objects },
  { name: 'travel', glyph: 'emoji_travel', chars: categories.places },
  { name: 'activity', glyph: 'emoji_activity', chars: categories.activity },
  { name: 'symbols', glyph: 'emoji_objects', chars: [...categories.symbols, ...categories.flags] }
];
