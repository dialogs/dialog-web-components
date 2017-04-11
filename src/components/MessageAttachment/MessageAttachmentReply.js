/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, Peer } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import MessageAttachmentItem from './MessageAttachmentItem';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  message: Message,
  goToPeer: (peer: Peer) => any,
  goToMessage: (message: Message) => any
};

function MessageAttachmentReply(props: Props): React.Element<any> {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      <MessageAttachmentItem
        message={props.message}
        type="reply"
        short={false}
        goToPeer={props.goToPeer}
        goToMessage={props.goToMessage}
      />
    </div>
  );
}

export default MessageAttachmentReply;
