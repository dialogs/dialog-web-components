/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { List, OrderedSet } from 'immutable';

export interface SelectorState<T> {
  hasQuery(): boolean;
  getQuery(): string;
  setQuery(query: string): SelectorState<T>;
  getShow(): boolean;
  setShow(show: boolean): SelectorState<T>;
  getItems(): List<T>;
  getItem(index: number): T;
  replaceItems(items: Iterable<T>): SelectorState<T>;
  getHovered(): T;
  getHoverIndex(): number;
  setHoverIndex(index: number): SelectorState<T>;
  getSelected(): OrderedSet<T>;
  isSelected(item: T): boolean;
  addSelected(item: T): SelectorState<T>;
  clearSelection(): SelectorState<T>;
  deleteSelected(item: T): SelectorState<T>;
  toggleSelected(item: T): SelectorState<T>;
  handleKeyboardEvent(event: SyntheticKeyboardEvent<>): SelectorState<T>;
}

export type SelectorStateCreator<T> = {
  create(items: Array<T>): SelectorState<T>,
};
