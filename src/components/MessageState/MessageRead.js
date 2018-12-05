/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { peerToString } from '@dlghq/dialog-types/utils';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './MessageState.css';

type Props = {
  readBy?: PeerInfo[],
};

class MessageRead extends PureComponent<Props> {
  renderAvatars(): Node {
    const { readBy } = this.props;
    if (!readBy) {
      return null;
    }

    return readBy.map((reader) => (
      <PeerAvatar
        key={peerToString(reader.peer)}
        className={styles.avatar}
        peer={reader}
        size={14}
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
      [styles.inline]: isInline,
    });

    if (isInline) {
      return (
        <Text
          className={className}
          id="MessageState.read_by_count"
          tagName="div"
          values={{ count: String(readBy.length) }}
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
