/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './EmojiList.css';
import Emoji from '../Emoji/Emoji';

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
        <div key={char} className={styles.emojiWrapper} onClick={this.props.onClick}>
          <Emoji
            className={styles.emoji}
            char={char}
          />
        </div>
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
