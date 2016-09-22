/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageStateProps } from './types';
import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import Spinner from '../Spinner/Spinner';
import MessageRead from './MessageRead';
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
        return <Spinner type="round" className={styles.sending} />;

      case 'sent':
        return <Text id="MessageState.sent" tagName="div" />;

      case 'received':
        return <Text id="MessageState.delivered" tagName="div" />;

      case 'read':
        return <MessageRead readBy={readBy} />;

      case 'error':
        return <Text id="MessageState.error" className={styles.error} tagName="div" />;

      default:
        return <Text id="MessageState.unknown" className={styles.error} tagName="div" />;
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
