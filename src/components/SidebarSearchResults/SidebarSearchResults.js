/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SidebarSearchResultsProps } from './types';
import type { PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';

import Emoji from '../Emoji/Emoji';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import classNames from 'classnames';
import SidebarPeerItem from '../SidebarPeerItem/SidebarPeerItem';
import SidebarSearchItem from './SidebarSearchItem/SidebarSearchItem';
import styles from './SidebarSearchResults.css';

class SidebarSearchResults extends PureComponent<SidebarSearchResultsProps> {
  renderPeers(): Node {
    const { peers } = this.props;

    if (!peers.length) {
      return null;
    }

    return peers.map((peerInfo: PeerInfo) => {
      return (
        <SidebarPeerItem
          key={peerInfo.peer.id}
          active={false}
          counter={0}
          onSelect={this.props.onGoToPeer}
          info={peerInfo}
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
              id="SidebarSearchResults.error"
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
            id="SidebarSearchResults.not_found"
            values={{ query: this.props.query }}
          />
        </div>
      );
    }

    const children = messages.value.map((item) => {
      return (
        <SidebarSearchItem
          key={item.focus.mid}
          info={item.info}
          before={item.before}
          after={item.after}
          focus={item.focus}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });

    return (
      <div className={styles.messages}>
        <Text
          className={styles.header}
          html
          tagName="header"
          id="SidebarSearchResults.count"
          values={{ count: messages.value.length.toString() }}
        />
        {children}
      </div>
    );
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

export default SidebarSearchResults;
