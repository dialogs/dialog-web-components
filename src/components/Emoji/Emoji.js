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
  onClick: () => void
};

function Emoji(props: Props): React.Element<any> {
  const className = classNames(styles.container, props.className);
  const emoji = getEmojiByChar(props.char);
  const style = {
    backgroundImage: `url(${emojiImage})`,
    backgroundPosition: `${(100 / SPRITE_SIZE) * emoji.x}% ${(100 / SPRITE_SIZE) * emoji.y}%`,
    backgroundSize: `${SPRITE_SIZE * 100}%`
  };
  console.debug(emoji);

  return (
    <div className={className} title={emoji.name} onClick={props.onClick}>
      <span className={styles.image} style={style} />
    </div>
  );
}

export default Emoji;
