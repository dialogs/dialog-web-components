/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { getEmojiByChar } from '@dlghq/emoji';
import emojiImage from '@dlghq/emoji/dist/apple.png';
import styles from './Emoji.css';

const SPRITE_SIZE = 40;

export type Props = {
  className?: string,
  char: string,
  onClick: (emoji: string) => void
};

class Emoji extends PureComponent {
  props: Props;

  handleClick = (): void => {
    const emoji = getEmojiByChar(this.props.char);
    this.props.onClick(emoji);
  };

  render(): ?React.Element<any> {
    const emoji = getEmojiByChar(this.props.char);
    if (!emoji) {
      return null;
    }

    if (emoji.useImage) {
      const className = classNames(styles.image, this.props.className);

      const style = {
        backgroundImage: `url(${emojiImage})`,
        backgroundPosition: `${(100 / SPRITE_SIZE) * emoji.x}% ${(100 / SPRITE_SIZE) * emoji.y}%`,
        backgroundSize: `${SPRITE_SIZE * 100}%`
      };

      return (
        <span className={className} style={style} title={emoji.name} onClick={this.handleClick}>
          {emoji.char}
        </span>
      );
    }

    const className = classNames(styles.char, this.props.className);

    return (
      <span className={className} title={emoji.name} onClick={this.handleClick}>
        {emoji.char}
      </span>
    );
  }
}

export default Emoji;
