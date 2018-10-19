/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import TextMessagePreview from './TextMessagePreview';
import getShortTitle from '../utils/getShortTitle';
import styles from '../SidebarRecentItem.css';

export type Props = {
  className?: string,
  uid: number,
  info: PeerInfo,
  message: Message
};

class MessagePreview extends PureComponent<Props> {
  renderStatusSender() {
    const { uid, info, message } = this.props;
    if (message && message.sender) {
      if (uid === message.sender.peer.id) {
        return <Text className={styles.sender} id="SidebarRecentItem.you" />;
      }

      if (info.type === 'group') {
        const title = getShortTitle(message.sender.title);

        return (
          <span className={styles.sender}>
            <PeerInfoTitle title={title} emojiSize={15} />
            {': '}
          </span>
        );
      }
    }

    return null;
  }

  render() {
    const { className, message: { attachment, content } } = this.props;

    switch (content.type) {
      case 'text':
        return (
          <div className={className}>
            {this.renderStatusSender()}
            <TextMessagePreview attachment={attachment} content={content} className={styles.preview} emojiSize={15} />
          </div>
        );

      case 'service':
        return (
          <div className={className}>
            <span className={styles.service}>
              {content.text}
            </span>
          </div>
        );

      case 'unsupported':
        return null;

      default:
        return (
          <div className={className}>
            {this.renderStatusSender()}
            <Text className={styles.highlight} id={`SidebarRecentItem.${content.type}`} />
          </div>
        );
    }
  }
}

export default MessagePreview;
