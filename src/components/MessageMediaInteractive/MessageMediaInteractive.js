/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractive as MessageMediaInteractiveType,
  MessageMediaInteractiveConfirm
} from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './MessageMediaInteractive.css';
import MessageMediaInteractiveGroup from './MessageMediaInteractiveGroup/MessageMediaInteractiveGroup';

export type Props = {
  className?: string,
  media: MessageMediaInteractiveType,
  onSubmit?: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
};

class MessageMediaInteractive extends PureComponent {
  props: Props;

  renderContent() {
    const { media } = this.props;

    return media.content.map((group, index) => {
      return (
        <MessageMediaInteractiveGroup
          key={index}
          className={styles.action}
          group={group}
          onSubmit={this.props.onSubmit}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderContent()}
      </div>
    );
  }
}

export default MessageMediaInteractive;
