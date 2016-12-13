/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Emoji from '../Emoji/Emoji';
import { categories } from '@dlghq/emoji';

export type Props = {
  className?: string,
  onClick: (char: string) => void
};

const RENDER_ORDER = [
  'people',
  'nature',
  'foods',
  'objects',
  'activity',
  'symbols',
  'flags'
];

class EmojiList extends PureComponent {
  props: Props;

  renderCategory(category: string): React.Element<any> {
    const children = categories[category].map((emoji) => {
      return (
        <div className={styles.emojiWrapper} onClick={this.props.onClick} key={emoji}>
          <Emoji char={emoji} className={styles.emoji}/>
        </div>
      );
    });

    return (
      <div key={category} className={styles.category}>
        <div className={styles.categoryTitle}>{category}</div>
        <div className={styles.categoryList}>{children}</div>
      </div>
    );
  }

  renderTabs(): React.Element<any> {
    let children = [];
    children.push(
      <div className={styles.footerTab} key="recent">
        <Icon glyph="schedule" className={styles.footerTabIcon} onClick={console.debug} />
      </div>
    )

    for (let category of RENDER_ORDER) {
      let glyph;
      switch (category) {
        case 'people':
          glyph = 'emoji_smile'
          break;
        case 'nature':
          glyph = 'emoji_nature'
          break;
        case 'foods':
          glyph = 'emoji_food'
          break;
        case 'objects':
          glyph = 'emoji_party'
          break;
        case 'activity':
          glyph = 'emoji_activity'
          break;
        case 'symbols':
          glyph = 'emoji_travel'
          break;
        case 'flags':
          glyph = 'emoji_objects'
          break;
        default:
      }

      children.push(
        <div className={styles.footerTab} key={glyph}>
          <Icon glyph={glyph} className={styles.footerTabIcon} onClick={console.debug} />
        </div>
      )
    }

    return (
      <footer className={styles.footer}>
        {children}
      </footer>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);
    const children = [];
    for (let category of RENDER_ORDER) {
      children.push(this.renderCategory(category));
    }

    return (
      <section className={className}>
        <div className={styles.body}>
          {children}
        </div>
        {this.renderTabs()}
      </section>
    );
  }
}

export default EmojiList;
