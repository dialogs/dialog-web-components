/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import { formatTime } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import DoublePeerAvatar from '../DoublePeerAvatar/DoublePeerAvatar';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styles from './SidebarCallItem.css';

export type CallState = 'outgoing' | 'incoming' | 'canceled' | 'missed';

export type Props = {
  className?: string,
  call: CallInfo,
  uid: number,
  onSelect: (call: CallInfo) => any
};

class SidebarCallItem extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onSelect(this.props.call);
  };

  getCallState = (): CallState => {
    const { uid, call: { initiator, isAnswered } } = this.props;

    let state = '';

    if (uid === initiator.peer.id) {
      state = 'outgoing';
    } else {
      state = 'incoming';
    }

    if (!isAnswered) {
      if (state === 'outgoing') {
        state = 'canceled';
      } else {
        state = 'missed';
      }
    }

    return state;
  };

  renderAvatar(): React.Element<any> {
    return (
      <DoublePeerAvatar
        className={styles.avatar}
        size={40}
        peerBig={this.props.call.initiator}
        peerSmall={this.props.call.recipient}
      />
    );
  }

  renderState(): React.Element<any> {
    const state = this.getCallState();

    return (
      <div className={styles.state}>
        <Text id={`SidebarCallItem.${state}`} />
        {this.renderDuration()}
      </div>
    );
  }

  renderTime(): React.Element<any> {
    const { call: { date } } = this.props;

    return (
      <time className={styles.time}>
        {distanceInWordsToNow(date, { addSuffix: true, includeSeconds: true })}
      </time>
    );
  }

  renderDuration(): ?React.Element<any> {
    const { call: { duration, isAnswered } } = this.props;

    if (!isAnswered) {
      return null;
    }

    return (
      <time className={styles.duration}>: {formatTime(Math.floor(duration / 1000))}</time>
    );
  }

  renderText(): React.Element<any> {
    return (
      <div className={styles.text}>
        {this.renderState()}
        {this.renderTime()}
      </div>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        {this.renderAvatar()}
        {this.renderText()}
      </div>
    );
  }
}

export default SidebarCallItem;
