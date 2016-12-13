/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Emoji from '../Emoji/Emoji';
import Icon from '../Icon/Icon';
import categories from './categories';

export type Props = {
  className?: string,
  onClick: (char: string) => void
};

function getGlyph(category: string): string {
  switch (category) {
    case 'people':
      return 'emoji_smile';

    case 'nature':
      return 'emoji_nature';

    case 'foods':
      return 'emoji_food';

    case 'objects':
      return 'emoji_party';

    case 'activity':
      return 'emoji_activity';

    case 'symbols':
      return 'emoji_travel';

    case 'flags':
      return 'emoji_objects';

    default:
      return 'emoji_smile';
  }
}

class EmojiList extends PureComponent {
  props: Props;

  handleClick = (...args) => {
    console.debug(...args);
  };

  renderCategories(): React.Element<any>[] {
    return categories.map(({ name, chars }) => {
      const children = chars.map((char) => {
        return (
          <div className={styles.emojiWrapper} onClick={this.props.onClick} key={char}>
            <Emoji char={char} className={styles.emoji} />
          </div>
        );
      });

      return (
        <div key={name} className={styles.category}>
          <div className={styles.categoryTitle}>{name}</div>
          <div className={styles.categoryList}>{children}</div>
        </div>
      );
    });
  }

  renderTabs(): React.Element<any> {
    const children = [];
    children.push(
      <div className={styles.footerTab} key="recent">
        <Icon glyph="schedule" className={styles.footerTabIcon} onClick={this.handleClick} />
      </div>
    );

    for (const { name } of categories) {
      children.push(
        <div className={styles.footerTab} key={name}>
          <Icon glyph={getGlyph(name)} className={styles.footerTabIcon} onClick={this.handleClick} />
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
