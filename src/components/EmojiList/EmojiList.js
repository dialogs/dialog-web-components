/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Icon from '../Icon/Icon';
import EmojiCategory from './EmojiCategory';
import categories from './categories';

export type Props = {
  className?: string,
  recent: ?string[],
  onClick: (char: string) => void
};

class EmojiList extends PureComponent {
  props: Props;

  handleClick = (...args) => {
    console.debug(...args);
  };

  renderCategories(): React.Element<any>[] {
    const result = [];
    if (this.props.recent) {
      result.push(
        <EmojiCategory
          key="recent"
          name="recent"
          chars={this.props.recent}
        />
      );
    }

    for (const { name, chars } of categories) {
      result.push(
        <EmojiCategory
          key={name}
          name={name}
          chars={chars}
        />
      );
    }

    return result;
  }

  renderTabs(): React.Element<any> {
    const children = [];
    if (this.props.recent) {
      children.push(
        <div className={styles.footerTab} key="recent">
          <Icon glyph="schedule" className={styles.footerTabIcon} onClick={this.handleClick} />
        </div>
      );
    }

    for (const { name, glyph } of categories) {
      children.push(
        <div className={styles.footerTab} key={name}>
          <Icon glyph={glyph} className={styles.footerTabIcon} onClick={this.handleClick} />
        </div>
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
        <div className={styles.body}>
          {this.renderCategories()}
        </div>
        {this.renderTabs()}
      </section>
    );
  }
}

export default EmojiList;
