/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { List } from 'immutable';

export type Filterable<T> = Array<T> | List<T>;

function filterByQuery<T, C: Filterable<T>>(query: string, items: C, getValue: (item: T) => string): C {
  const lowerQuery = query.toLowerCase();

  return items.filter((item) => {
    const value = getValue(item).toLowerCase();
    return value.indexOf(lowerQuery) !== -1;
  });
}

export default filterByQuery;
