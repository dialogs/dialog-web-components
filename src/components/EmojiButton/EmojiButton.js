/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Emoji from '../Emoji/Emoji';
import styles from './EmojiButton.css';

export type Props = {
  className?: string,
  count: number,
  char: string,
  onClick: () => void,
  active: boolean
};

function EmojiButton(props: Props): React.Element<any> {
  const className = classNames(styles.container, {
    [styles.active]: props.active
  }, props.className);

  return (
    <button className={className} onClick={props.onClick}>
      <Emoji className={styles.emoji} char={props.char} size="18" />
      <span className={styles.counter}>{props.count}</span>
    </button>
  );
}

export default EmojiButton;
