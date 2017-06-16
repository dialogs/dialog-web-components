/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { getEmojiByChar, shouldUseImage } from '@dlghq/emoji';
import emojiImage from '@dlghq/emoji/lib/apple.png';
import styles from './Emoji.css';

const SPRITE_SIZE = 49;
const SPRITE_BG_SIZE = SPRITE_SIZE * 100;
const SPRITE_POSITION_MUL = 100 / (SPRITE_SIZE - 1);

const SPRITE_IMAGE = `url(${emojiImage})`;

export type Props = {
  className?: string,
  char: string,
  size: number,
  children?: any,
  inline?: boolean
};

class Emoji extends PureComponent {
  props: Props;

  static defaultProps = {
    size: 20
  };

  render() {
    const emoji = getEmojiByChar(this.props.char);
    if (!emoji) {
      return null;
    }

    if (shouldUseImage(emoji.char)) {
      const className = classNames(styles.image, this.props.className);

      const style = {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`,
        backgroundImage: SPRITE_IMAGE,
        backgroundPosition: `${SPRITE_POSITION_MUL * emoji.x}% ${SPRITE_POSITION_MUL * emoji.y}%`,
        backgroundSize: `${SPRITE_BG_SIZE}%`,
        marginTop: this.props.inline ? '-2px' : 0
      };

      return (
        <span className={className} style={style} title={emoji.name}>
          {this.props.children || emoji.char}
        </span>
      );
    }

    const className = classNames(styles.char, this.props.className);
    const emojiStyle = {
      width: `${this.props.size}px`,
      height: `${this.props.size}px`,
      fontSize: `${this.props.size}px`,
      lineHeight: `${this.props.size * (this.props.inline ? 1.1 : 1.2)}px`,
      marginTop: this.props.inline ? '-2px' : '-1px'
    };

    return (
      <span className={className} style={emojiStyle} title={emoji.name}>
        {this.props.children || emoji.char}
      </span>
    );
  }
}

export default Emoji;
