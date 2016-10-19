/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function filterByQuery<T>(query: string, items: T[], getValue: (item: T) => string): T[] {
  const lowerQuery = query.toLowerCase();

  return items.filter((item) => {
    const value = getValue(item).toLowerCase();
    return value.indexOf(lowerQuery) !== -1;
  });
}

export default filterByQuery;
