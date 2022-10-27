/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './EmojiList.css';
import EmojiListItem from './EmojiListItem';

type Props = {
  name: string,
  chars: string[],
  active: boolean,
  isAtBottom: boolean,
  onClick: (char: string) => any
};

class EmojiCategory extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const children = this.props.chars.map((char) => {
      return (
        <EmojiListItem
          key={char}
          char={char}
          className={styles.emojiWrapper}
          onClick={this.props.onClick}
        />
      );
    });

    const containerStyles = {};
    const titleStyles = {};

    if (this.props.active) {
      if (this.props.isAtBottom) {
        containerStyles.position = 'relative';
        titleStyles.bottom = 0;
        titleStyles.top = 'auto';
      } else {
        titleStyles.top = 0;
        containerStyles.position = 'static';
      }
    } else {
      titleStyles.top = 0;
    }

    return (
      <div className={styles.category} style={containerStyles} data-category={this.props.name}>
        <Text
          id={`EmojiList.${this.props.name}`}
          tagName="div"
          className={styles.categoryTitle}
          style={titleStyles}
        />
        <div className={styles.categoryList}>{children}</div>
      </div>
    );
  }
}

export default EmojiCategory;
