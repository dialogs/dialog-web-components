/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { CallState, User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './CallAvatar.css';

export type Props = {
  small: boolean,
  isAudioCall: boolean,
  state: CallState,
  caller: User
};

class CallAvatar extends PureComponent {
  props: Props;

  getAvatarSize = (): number => {
    const { small, isAudioCall } = this.props;

    if (isAudioCall) {
      return small ? 48 : 136;
    }

    return small ? 30 : 50;
  };

  renderAnimation(): ?React.Element<any> {
    const { state, isAudioCall, small } = this.props;
    const className = classNames(styles.animation, {
      [styles.animationSmall]: small,
      [styles.animationEnded]: state === 'in_progress' || state === 'ended' || !isAudioCall
    });

    return (
      <div className={className}>
        <div />
        <div />
        <div />
      </div>
    );
  }

  render(): React.Element<any> {
    const { isAudioCall, caller: { avatar, name, placeholder }, small } = this.props;
    const className = classNames(styles.container, {
      [styles.audioAvatar]: isAudioCall,
      [styles.avatarSmall]: small
    });

    return (
      <div className={className}>
        {this.renderAnimation()}
        <Avatar
          className={styles.avatar}
          size={this.getAvatarSize()}
          image={avatar}
          title={name}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default CallAvatar;
