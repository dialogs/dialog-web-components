/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Emoji from '../Emoji/Emoji';
import styles from './EmojiButton.css';

export type Props = {
  className?: string,
  count: number,
  char: string,
  onClick: (char: string) => void,
  active: boolean
};

class EmojiButton extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onClick(this.props.char);
  };

  render(): React.Element<any> {
    const className = classNames(styles.container, {
      [styles.active]: this.props.active
    }, this.props.className);

    return (
      <button className={className} onClick={this.handleClick}>
        <Emoji className={styles.emoji} char={this.props.char} size={16} />
        <span className={styles.counter}>{this.props.count}</span>
      </button>
    );
  }
}

export default EmojiButton;
