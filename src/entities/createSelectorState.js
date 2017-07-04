/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorStateCreator } from './types';
import { Record, List, OrderedSet } from 'immutable';
import { calculateCursor, filterByQuery } from '@dlghq/dialog-utils';

function createSelectorState<T>(
  name: string,
  getValue: (item: T) => string,
  clearAfterSelection: boolean = false
): SelectorStateCreator<T> {
  const defaultRecord = {
    query: '',
    show: true,
    items: List(),
    filtered: List(),
    selected: OrderedSet(),
    hoverIndex: 0
  };

  function filter(query: string, items: List<T>): List<T> {
    return List(filterByQuery(query, items, getValue));
  }

  class SelectorState extends Record(defaultRecord, name) {
    hasQuery(): boolean {
      return Boolean(this.get('query'));
    }

    getQuery(): string {
      return this.get('query');
    }

    setQuery(query: string): SelectorState {
      if (query === this.get('query')) {
        return this;
      }

      const filtered = filter(query, this.get('items'));

      let hoverIndex = 0;
      if (this.getHoverIndex() !== 0) {
        const hovered = this.getHovered();
        const sameHoverIndex = filtered.findIndex((item) => item === hovered);
        if (sameHoverIndex !== -1) {
          hoverIndex = sameHoverIndex;
        }
      }

      return this.set('query', query)
        .set('filtered', filtered)
        .set('hoverIndex', hoverIndex);
    }

    getShow(): boolean {
      return this.get('show');
    }

    setShow(show: boolean): SelectorState {
      return this.set('show', show);
    }

    getItems(): List<T> {
      return this.get('filtered');
    }

    getItem(index: number): T {
      return this.getItems().get(index);
    }

    getHovered(): T {
      return this.getItem(this.getHoverIndex());
    }

    getHoverIndex(): number {
      return this.get('hoverIndex');
    }

    setHoverIndex(hoverIndex: number): SelectorState {
      const max = this.getItems().size;

      return this.set('hoverIndex', calculateCursor({ max, next: hoverIndex }));
    }

    getSelected(): OrderedSet<T> {
      return this.get('selected');
    }

    isSelected(item: T): boolean {
      return this.getSelected().has(item);
    }

    addSelected(item: T): SelectorState {
      const selected = this.get('selected');
      let nextState = this.set('selected', selected.add(item));
      if (clearAfterSelection) {
        nextState = nextState.setQuery('');
      }

      return nextState;
    }

    deleteSelected(item: T): SelectorState {
      const selected = this.get('selected');
      let nextState = this.set('selected', selected.delete(item));
      if (clearAfterSelection) {
        nextState = nextState.setQuery('');
      }

      return nextState;
    }

    toggleSelected(item: T): SelectorState {
      const selected = this.get('selected');

      return selected.has(item) ? this.deleteSelected(item) : this.addSelected(item);
    }

    handleKeyboardEvent(event: SyntheticKeyboardEvent): SelectorState {
      switch (event.key) {
        case 'Esc':
          event.preventDefault();

          return this.setShow(false).setQuery('');

        case 'Tab':
          event.preventDefault();

          return this.addSelected(
            this.getHovered()
          );

        case 'Enter':
          event.preventDefault();

          return this.toggleSelected(
            this.getHovered()
          );

        case 'ArrowUp':
          event.preventDefault();

          return this.setHoverIndex(
            this.getHoverIndex() - 1
          );

        case 'ArrowDown':
          event.preventDefault();

          return this.setHoverIndex(
            this.getHoverIndex() + 1
          );

        case 'Backspace':
          if (!this.hasQuery()) {
            event.preventDefault();
            const last = this.getSelected().last();
            if (last) {
              return this.deleteSelected(last);
            }
          }

          return this;

        default:
          return this;
      }
    }
  }

  return {
    create(items: T[]): SelectorState {
      const list = List(items);

      return new SelectorState({
        items: list,
        filtered: list
      });
    }
  };
}


export default createSelectorState;
