/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageState as MessageStateType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Tooltip from '../Tooltip/Tooltip';
import styles from './MessageState.css';

type Props = {
  className?: string,
  state: MessageStateType,
  time: string,
  isEdited?: boolean,
  hover: boolean,
  compact: boolean,
  onClick: () => mixed
};

class MessageState extends PureComponent {
  props: Props;

  handleClick = (event: SyntheticMouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onClick();
  };

  renderState() {
    const children = [];
    if (!this.props.compact || this.props.hover || !this.props.isEdited) {
      children.push(
        <time key="t" className={styles.time} onClick={this.handleClick}>
          {this.props.time}
        </time>
      );
    }

    if (!this.props.compact || (!this.props.hover && this.props.isEdited)) {
      children.push(
        <Text key="e" className={styles.edited} id="MessageState.edited" />
      );
    }

    return children;
  }

  render() {
    const className = classNames(
      styles.container,
      this.props.className
    );

    const time = (
      <div className={className}>
        {this.renderState()}
      </div>
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
