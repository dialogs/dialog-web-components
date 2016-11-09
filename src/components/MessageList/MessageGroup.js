/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message as MessageType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import Message from '../Message/Message';

export type Props = {
  messages: MessageType[],
  renderActions?: () => React.Element<any>[],
  className?: string
};

class MessageGroup extends Component {
  renderMessages(): React.Element<any>[] {
    const { messages, renderActions } = this.props;

    return messages.map((message, index) => {
      return (
        <Message
          message={message}
          key={message.rid}
          renderActions={renderActions}
          short={index !== 0}
        />
      );
    });
  }

  render(): React.Element<any> {
    return (
      <section className={this.props.className}>
        {this.renderMessages()}
      </section>
    );
  }
}

export default MessageGroup;
