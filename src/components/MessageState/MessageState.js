/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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

    const time = (
      <time className={className}>
        {' ' + this.props.time}
      </time>
    );

    if (this.props.state === 'unknown') {
      return time;
    }

    return (
      <Tooltip text={`MessageState.${this.props.state}`}>
        {time}
      </Tooltip>
    );
  }
}

export default MessageState;
