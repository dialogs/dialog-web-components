/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from '../Call/Call.css';

export type CallAvatarProps = {
  state: CallState,
  caller: {
    title: string,
    avatar: string,
    placeholder: string
  },
  className?: string
}

class CallAvatar extends Component {
  props: CallAvatarProps;

  shouldComponentUpdate(nextProps: CallAvatarProps) {
    return nextProps.className !== this.props.className;
  }

  render() {
    const { state, caller } = this.props;
    const className = classNames(styles.avatar, styles[state], this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          size="super"
          peer={{
            title: caller.title,
            placeholder: caller.placeholder,
            avatar: caller.avatar
          }}
        />
      </div>
    );
  }
}

export default CallAvatar;
