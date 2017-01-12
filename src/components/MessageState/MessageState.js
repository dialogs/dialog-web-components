/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageStateProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';
import styles from './MessageState.css';

class MessageState extends PureComponent {
  props: MessageStateProps;

  render() {
    const className = classNames(styles.container, this.props.className);

    if (this.props.state === 'unknown') {
      return (
        <time className={className}>
          {this.props.time}
        </time>
      );
    }

    return (
      <Tooltip text={`MessageState.${this.props.state}`}>
        <time className={className}>
          {this.props.time}
        </time>
      </Tooltip>
    );
  }
}

export default MessageState;
