/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './EmojiList.css';
import Emoji from '../Emoji/Emoji';

function EmojiCategory(props): React.Element<any> {
  const children = props.chars.map((char) => {
    return (
      <div key={char} className={styles.emojiWrapper} onClick={props.onClick}>
        <Emoji
          className={styles.emoji}
          char={char}
        />
      </div>
    );
  });

  return (
    <div className={styles.category}>
      <div className={styles.categoryTitle}>{props.name}</div>
      <div className={styles.categoryList}>{children}</div>
    </div>
  );
}

export default EmojiCategory;
