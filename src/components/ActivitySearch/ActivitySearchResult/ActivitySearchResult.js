/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo, Field } from '@dlghq/dialog-types';
import { Text } from '@dlghq/react-l10n';
import { peerToString } from '@dlghq/dialog-types/utils';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';

import type { SearchEntity } from '../types';
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
  onGoToPeer: (peer: Peer) => mixed,
};

class ActivitySearchMessages extends PureComponent<Props> {
  renderPeers(): Node {
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

  renderMessages(): Node {
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
