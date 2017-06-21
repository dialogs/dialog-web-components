/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo, Field } from '@dlghq/dialog-types';
import type { SearchEntity } from '../types';
import { Text } from '@dlghq/react-l10n';
import { peerToString } from '@dlghq/dialog-types/utils';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Spinner from '../../Spinner/Spinner';
import Error from '../../Error/Error';
import Emoji from '../../Emoji/Emoji';
import ActivitySearchMessage from '../ActivitySearchItem/ActivitySearchItem';
import ActivitySearchItemPeer from '../ActivitySearchItemPeer/ActivitySearchItemPeer';
import styles from './ActivitySearchResult.css';

type Props = {
  className?: string,
  query: string,
  peers: PeerInfo[],
  messages: Field<SearchEntity[]>,
  onGoToMessage: (peer: Peer, message: Message) => mixed,
  onGoToPeer: (peer: Peer) => mixed
};

class ActivitySearchMessages extends PureComponent {
  props: Props;

  renderPeers() {
    return this.props.peers.map((item) => {
      return (
        <ActivitySearchItemPeer
          key={peerToString(item.peer)}
          info={item}
          onGoToPeer={this.props.onGoToPeer}
        />
      );
    });
  }

  renderMessages() {
    const { messages } = this.props;

    if (messages.pending) {
      return (
        <div className={styles.spinnerWrapper}>
          <Spinner className={styles.spinner} size="large" />
        </div>
      );
    }

    if (messages.error) {
      return (
        <div className={styles.text}>
          <Emoji char="❗" size={50} className={styles.textEmoji} />
          <Error className={styles.error}>
            <Text
              html
              tagName="div"
              id="ActivitySearch.error"
              values={{ error: messages.error.message }}
            />
          </Error>
        </div>
      );
    }

    if (!messages.value.length) {
      return (
        <div className={styles.text}>
          <Emoji char="☹" size={50} className={styles.textEmoji} />
          <Text
            html
            tagName="div"
            id="ActivitySearch.not_found"
            values={{ query: this.props.query }}
          />
        </div>
      );
    }

    return messages.value.map((item) => {
      return (
        <ActivitySearchMessage
          key={item.focus.rid}
          info={item.info}
          before={item.before}
          after={item.after}
          focus={item.focus}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderPeers()}
        {this.renderMessages()}
      </div>
    );
  }
}

export default ActivitySearchMessages;
