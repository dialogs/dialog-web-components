/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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

    return (
      <Tooltip text={`MessageState.${this.props.state}`}>
        <div className={className}>
          {this.props.time}
        </div>
      </Tooltip>
    );
  }
}

export default MessageState;
