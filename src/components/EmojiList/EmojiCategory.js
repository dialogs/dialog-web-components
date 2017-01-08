/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './EmojiList.css';
import EmojiListItem from './EmojiListItem';

type Props = {
  name: string,
  chars: string[],
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

    return (
      <div className={styles.category} data-category={this.props.name}>
        <div className={styles.categoryTitle}>{this.props.name}</div>
        <div className={styles.categoryList}>{children}</div>
      </div>
    );
  }
}

export default EmojiCategory;
