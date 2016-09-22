/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageStateProps } from './types';
import React, { Component } from 'react';
import MessageSending from './MessageSending';
import MessageSent from './MessageSent';
import MessageRead from './MessageRead';
import MessageError from './MessageError';
import styles from './MessageState.css';

class MessageState extends Component {
  props: MessageStateProps;

  shouldComponentUpdate(nextProps: MessageStateProps) {
    return nextProps.state !== this.props.state ||
           nextProps.readBy !== this.props.readBy;
  }

  renderState() {
    const { state, readBy } = this.props;

    switch (state) {
      case 'pending':
        return <MessageSending />;

      case 'sent':
        return <MessageSent />;

      case 'read':
        return <MessageRead readBy={readBy} />;

      case 'error':
        return <MessageError />;

      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderState()}
      </div>
    );
  }
}

export default MessageState;
