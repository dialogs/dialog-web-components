/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import Emoji from '../Emoji/Emoji';
import { getEmojiByChar } from '@dlghq/emoji';
import styles from './EmojiList.css';

export type Props = {
  className?: string,
  char: string,
  onClick: (emoji: string) => void
};

class EmojiListItem extends PureComponent {
  props: Props;

  handleClick = (): void => {
    const emoji = getEmojiByChar(this.props.char);
    this.props.onClick(emoji);
  };

  render(): ?React.Element<any> {
    const { char } = this.props;

    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <Emoji char={char} className={styles.emoji} />
      </div>
    );
  }
}

export default EmojiListItem;
