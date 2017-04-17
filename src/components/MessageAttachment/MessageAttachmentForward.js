/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo, Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import MessageAttachmentItem from './MessageAttachmentItem';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  from: PeerInfo,
  messages: Message[],
  goToPeer: (peer: Peer) => any,
  goToMessage: (message: Message) => any
};

class MessageAttachmentForward extends PureComponent {
  props: Props;

  handleGoToPeer = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.goToPeer(this.props.from.peer);
  };

  renderHeader(): React.Element<any> {
    const { from } = this.props;

    return (
      <div className={styles.from}>
        <Text id="MessageAttachment.from" />
        <Button
          theme="primary"
          view="link"
          onClick={this.handleGoToPeer}
          size="small"
          className={styles.fromButton}
        >
          {(from.type === 'channel' || from.type === 'group') ? (
            <Icon glyph={from.type} className={styles.fromIcon} size={24} />
          ) : null}
          {from.title}
        </Button>
      </div>
    );
  }

  renderMessages(): React.Element<any>[] {
    const { messages } = this.props;
    let lastSenderId = 0;

    return messages.map((message) => {
      const isShort = message.sender ? message.sender.peer.id === lastSenderId : false;
      lastSenderId = message.sender ? message.sender.peer.id : 0;

      return (
        <MessageAttachmentItem
          key={message.rid}
          message={message}
          type="forward"
          short={isShort}
          goToPeer={this.props.goToPeer}
          goToMessage={this.props.goToMessage}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderHeader()}
        <div className={styles.messages}>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default MessageAttachmentForward;
