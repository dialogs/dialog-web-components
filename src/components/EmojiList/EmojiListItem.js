/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './EmojiList.css';

export type Props = {
  className?: string,
  char: string,
  onClick: (emoji: string) => mixed
};

class EmojiListItem extends PureComponent<Props> {
  handleClick = (): void => {
    this.props.onClick(this.props.char);
  };

  render() {
    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <Emoji className={styles.emoji} char={this.props.char} size={26} />
      </div>
    );
  }
}

export default EmojiListItem;
