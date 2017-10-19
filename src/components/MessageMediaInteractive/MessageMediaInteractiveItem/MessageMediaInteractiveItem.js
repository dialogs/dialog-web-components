/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractiveAction as MessageMediaInteractiveActionType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './MessageMediaInteractiveItem.css';
import MessageMediaInteractiveAction from '../MessageMediaInteractiveAction/MessageMediaInteractiveAction';

export type Props = {
  className?: string,
  actions: MessageMediaInteractiveActionType,
  title: string,
  description: string
};

class MessageMediaInteractiveItem extends PureComponent {
  props: Props;

  renderHeader() {
    return (
      <header className={styles.header}>
        <h5 className={styles.title}>{this.props.title}</h5>
        <p className={styles.description}>{this.props.description}</p>
      </header>
    );
  }

  renderActions() {
    const { actions } = this.props;

    if (!actions) {
      return null;
    }

    const children = this.props.actions.map((action) => {
      return (
        <MessageMediaInteractiveAction
          key={action.id}
          id={action.id}
          widget={action.widget}
          style={action.style}
        />
      );
    });

    return (
      <div className={styles.actions}>
        {children}
      </div>
    );
  }

  render() {
    console.debug('MessageMediaInteractiveItem', this.props);
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderHeader()}
        {this.renderActions()}
      </div>
    );
  }
}

export default MessageMediaInteractiveItem;
