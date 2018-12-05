/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractive as MessageMediaInteractiveType,
  MessageMediaInteractiveConfirm,
} from '@dlghq/dialog-types';
import type { ProviderContext as Context } from '@dlghq/react-l10n';
import React, { PureComponent, type Node } from 'react';
import { Provider, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';

import styles from './MessageMediaInteractive.css';
import MessageMediaInteractiveGroup from './MessageMediaInteractiveGroup/MessageMediaInteractiveGroup';

type Props = {
  className?: string,
  media: MessageMediaInteractiveType,
  onSubmit?: (
    id: string,
    value: string,
    confirm?: ?MessageMediaInteractiveConfirm,
  ) => mixed,
};

class MessageMediaInteractive extends PureComponent<Props> {
  props: Props;
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  renderContent(): Node {
    const { media } = this.props;

    return media.content.map((group, index) => {
      return (
        <MessageMediaInteractiveGroup
          key={`interactive_message_group_${index}`}
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
      <Provider
        locale={this.context.l10n.locale}
        messages={this.props.media.messages}
      >
        <div className={className}>{this.renderContent()}</div>
      </Provider>
    );
  }
}

export default MessageMediaInteractive;
