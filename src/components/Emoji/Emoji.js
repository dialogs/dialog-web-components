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

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);
    const emoji = getEmojiByChar(this.props.char);
    const style = {
      backgroundImage: `url(${emojiImage})`,
      backgroundPosition: `${(100 / SPRITE_SIZE) * emoji.x}% ${(100 / SPRITE_SIZE) * emoji.y}%`,
      backgroundSize: `${SPRITE_SIZE * 100}%`
    };

    return (
      <div className={className} title={emoji.name} onClick={this.handleClick}>
        <span className={styles.image} style={style} />
      </div>
    );
  }
}

export default Emoji;
