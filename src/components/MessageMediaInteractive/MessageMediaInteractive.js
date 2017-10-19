/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractive as MessageMediaInteractiveType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './MessageMediaInteractive.css';
import MessageMediaInteractiveItem from './MessageMediaInteractiveItem/MessageMediaInteractiveItem';

export type Props = {
  className?: string,
  media: MessageMediaInteractiveType
};

class MessageMediaInteractive extends PureComponent {
  props: Props;

  renderContent() {
    return this.props.media.content.map((item, index) => {
      return (
        <MessageMediaInteractiveItem
          key={`interactive_media_${index}`}
          className={styles.action}
          title={item.title}
          description={item.description}
          actions={item.actions}
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
