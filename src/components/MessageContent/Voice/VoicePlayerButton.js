/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './VoicePlayerButton.css';

export type Props = {
  pending: boolean,
  isPlaying: boolean,
  onPlay: () => any,
  onPause: () => any,
  className?: string
}

class VoicePlayerButton extends PureComponent {
  props: Props;

  handleButtonClick = () => {
    const { pending, isPlaying } = this.props;

    if (!pending) {
      if (isPlaying) {
        this.props.onPause();
      } else {
        this.props.onPlay();
      }
    }
  };

  renderIcon(): ?React.Element<any> {
    const { isPlaying } = this.props;

    if (!isPlaying) {
      return (
        <polygon className={styles.icon} transform="translate(1,0)" points="20 18 20 32 31 25" />
      );
    }

    return (
      <path
        d="M19,32 L23,32 L23,18 L19,18 L19,32 Z M27,18 L27,32 L31,32 L31,18 L27,18 Z"
        className={styles.icon}
      />
    );
  }

  renderBorder(): React.Element<any> {
    const className = classNames(styles.border);

    return (
      <circle
        className={className}
        cx="25"
        cy="25"
        r="22"
        fill="none"
        strokeMiterlimit="10"
      />
    );
  }

  render() {
    const className = classNames(styles.container, {
      [styles.pending]: this.props.pending
    }, this.props.className);

    return (
      <svg viewBox="0 0 50 50" className={className} onClick={this.handleButtonClick}>
        {this.renderIcon()}
        {this.renderBorder()}
      </svg>
    );
  }
}

export default VoicePlayerButton;
