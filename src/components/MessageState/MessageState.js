/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageState as MessageStateType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';
import styles from './MessageState.css';

type Props = {
  className?: string,
  state: MessageStateType,
  time: string,
  onClick: () => mixed
}

class MessageState extends PureComponent {
  props: Props;

  handleClick = (event: SyntheticMouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onClick();
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    const time = (
      <time className={className} onClick={this.handleClick}>
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
