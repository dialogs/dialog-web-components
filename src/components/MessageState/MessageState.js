/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageStateProps } from './types';
import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import Spinner from '../Spinner/Spinner';
import Tooltip from '../Tooltip/Tooltip'
import styles from './MessageState.css';

class MessageState extends Component {
  props: MessageStateProps;

  shouldComponentUpdate(nextProps: MessageStateProps) {
    return nextProps.state !== this.props.state ||
           nextProps.readBy !== this.props.readBy;
  }

  render() {
    return (
      <div className={styles.root}>
        <Tooltip text={`MessageState.${this.props.state}`}>
          {this.props.time}
        </Tooltip>
      </div>
    );
  }
}

export default MessageState;
