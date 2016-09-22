/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageReadProps } from './types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './MessageState.css';

class MessageRead extends Component {
  props: MessageReadProps;

  renderAvatars() {
    const { readBy } = this.props;
    if (!readBy) {
      return null;
    }

    // TODO: remove index as key
    return readBy.map((reader, index) => (
      <PeerAvatar
        className={styles.avatar}
        peer={reader}
        key={index}
        size="tiny"
      />
    ));
  }

  render() {
    const { readBy } = this.props;
    if (!readBy) {
      return (
        <Text className={styles.read} id="MessageState.read" tagName="div" />
      );
    }

    const isInline = readBy.length > 4;
    const className = classNames(styles.read, {
      [styles.inline]: isInline
    });

    if (isInline) {
      return (
        <Text
          className={className}
          id="MessageState.read_by_count"
          tagName="div"
          values={{ count: readBy.length }}
        />
      );
    }

    return (
      <div className={className}>
        <Text id="MessageState.read_by" />
        {this.renderAvatars()}
      </div>
    );
  }
}

export default MessageRead;
