/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import { categories } from '@dlghq/emoji';

export default [
  { name: 'people', chars: categories.people },
  { name: 'nature', chars: categories.nature },
  { name: 'foods', chars: categories.foods },
  { name: 'objects', chars: categories.objects },
  { name: 'activity', chars: categories.activity },
  { name: 'symbols', chars: [...categories.symbols, ...categories.flags] }
];
