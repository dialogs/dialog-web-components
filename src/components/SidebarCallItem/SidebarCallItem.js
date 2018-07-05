/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { Text } from '@dlghq/react-l10n';
import { formatTime } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import DoublePeerAvatar from '../DoublePeerAvatar/DoublePeerAvatar';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import getDateFnsLocale from '../../utils/getDateFnsLocale';
import styles from './SidebarCallItem.css';

export type CallState = 'outgoing' | 'incoming' | 'canceled' | 'missed';

export type Props = {
  className?: string,
  call: CallInfo,
  uid: number,
  onSelect: (call: CallInfo) => mixed
};

type Context = ProviderContext;

class SidebarCallItem extends PureComponent<Props> {
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType
  };

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

  renderAvatar() {
    return (
      <DoublePeerAvatar
        className={styles.avatar}
        size={40}
        peerBig={this.props.call.initiator}
        peerSmall={this.props.call.recipient}
      />
    );
  }

  renderState() {
    const state = this.getCallState();

    return (
      <div className={styles.state}>
        <Text id={`SidebarCallItem.${state}`} />
        {this.renderDuration()}
      </div>
    );
  }

  renderTime() {
    const { call: { date } } = this.props;
    const locale = getDateFnsLocale(this.context.l10n.locale);

    return (
      <time className={styles.time}>
        {distanceInWordsToNow(date, { addSuffix: true, includeSeconds: true, locale })}
      </time>
    );
  }

  renderDuration() {
    const { call: { duration, isAnswered } } = this.props;

    if (!isAnswered) {
      return null;
    }

    return (
      <time className={styles.duration}>
        {`: ${formatTime(Math.floor(duration / 1000))}`}
      </time>
    );
  }

  renderText() {
    return (
      <div className={styles.text}>
        {this.renderState()}
        {this.renderTime()}
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} onClick={this.handleClick} id={`sidebar_call_item_${this.props.call.id}`}>
        {this.renderAvatar()}
        {this.renderText()}
      </div>
    );
  }
}

export default SidebarCallItem;
