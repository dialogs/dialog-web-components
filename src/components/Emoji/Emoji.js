/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { getEmojiByChar, shouldUseImage } from '@dlghq/emoji';
import emojiImage from '@dlghq/emoji/dist/apple.png';
import styles from './Emoji.css';

const SPRITE_SIZE = 40;

export type Props = {
  className?: string,
  char: string,
  size?: number
};

class Emoji extends PureComponent {
  props: Props;

  render(): ?React.Element<any> {
    const emoji = getEmojiByChar(this.props.char);
    if (!emoji) {
      return null;
    }

    if (shouldUseImage(emoji.char)) {
      const className = classNames(styles.image, this.props.className);

      let style = {
        backgroundImage: `url(${emojiImage})`,
        backgroundPosition: `${(100 / SPRITE_SIZE) * emoji.x}% ${(100 / SPRITE_SIZE) * emoji.y}%`,
        backgroundSize: `${SPRITE_SIZE * 100}%`
      };

      if (this.props.size) {
        style = {
          ...style,
          width: this.props.size,
          height: this.props.size
        };
      }

      return (
        <span className={className} style={style} title={emoji.name}>
          {emoji.char}
        </span>
      );
    }

    const className = classNames(styles.char, this.props.className);

    let style = {};
    if (this.props.size) {
      style = {
        fontSize: this.props.size + 'px',
        lineHeight: 1
      };
    }

    return (
      <span className={className} style={style} title={emoji.name}>
        {emoji.char}
      </span>
    );
  }
}

export default Emoji;
