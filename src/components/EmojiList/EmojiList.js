/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { throttle } from 'lodash';
import { listen } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import categories from './categories';
import EmojiTab from './EmojiTab';
import EmojiCategory from './EmojiCategory';
import styles from './EmojiList.css';

export type Props = {
  className?: string,
  recent: ?string[],
  onClick: (char: string) => void
};

export type State = {
  current: string
};

class EmojiList extends PureComponent {
  props: Props;
  state: State;
  container: ?HTMLElement;
  categories: { [key: string]: ?HTMLElement };

  constructor(props: Props) {
    super(props);

    this.state = {
      current: props.recent ? 'recent' : categories[0].name
    };

    this.categories = {};

    this.handleScroll = throttle(this.handleScroll, 16);
  }

  componentDidMount(): void {
    if (this.container) {
      this.listener = listen(this.container, 'scroll', this.handleScroll, { passive: true });
    }
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleTabClick = (next) => {
    this.setState({
      current: next
    });

    const node = this.categories[next];
    if (node && this.container) {
      this.container.scrollTop = node.offsetTop;
    }
  };

  handleScroll = ({ target }) => {
    const { scrollTop } = target;
    const breakpoints = Object.keys(this.categories).map((name) => {
      const node = this.categories[name];
      return {
        name,
        offset: node.offsetTop
      };
    });

    if (breakpoints.length) {
      breakpoints.sort((left, right) => left.offset - right.offset);

      const firstOffset = breakpoints[0].offset;

      for (let i = breakpoints.length - 1; i >= 0; i--) {
        const breakpoint = breakpoints[i];
        if (breakpoint.offset - firstOffset <= scrollTop) {
          this.setState({
            current: breakpoint.name
          });
          break;
        }
      }
    }
  };

  setContainer = (container: ?HTMLElement): void => {
    this.container = container;
  };

  setCategory = (category: ?typeof EmojiCategory): void => {
    if (category) {
      const node = findDOMNode(category);
      if (node) {
        this.categories[node.dataset.category] = node;
      }
    }
  };

  renderCategories(): React.Element<any>[] {
    const result = [];
    if (this.props.recent) {
      result.push(
        <EmojiCategory
          key="recent"
          name="recent"
          chars={this.props.recent}
          ref={this.setCategory}
          onClick={this.props.onClick}
        />
      );
    }

    for (const { name, chars } of categories) {
      result.push(
        <EmojiCategory
          key={name}
          name={name}
          chars={chars}
          ref={this.setCategory}
          onClick={this.props.onClick}
        />
      );
    }

    return result;
  }

  renderTabs(): React.Element<any> {
    const children = [];
    if (this.props.recent) {
      children.push(
        <EmojiTab
          key="recent"
          name="recent"
          glyph="schedule"
          active={this.state.current === 'recent'}
          onClick={this.handleTabClick}
        />
      );
    }

    for (const { name, glyph } of categories) {
      children.push(
        <EmojiTab
          key={name}
          name={name}
          glyph={glyph}
          active={this.state.current === name}
          onClick={this.handleTabClick}
        />
      );
    }

    return (
      <footer className={styles.footer}>
        {children}
      </footer>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);
    return (
      <section className={className}>
        <div className={styles.body} ref={this.setContainer}>
          {this.renderCategories()}
        </div>
        {this.renderTabs()}
      </section>
    );
  }
}

export default EmojiList;
