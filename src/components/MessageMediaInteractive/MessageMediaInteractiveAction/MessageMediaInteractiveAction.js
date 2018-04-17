/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractiveAction as MessageMediaInteractiveActionType,
  MessageMediaInteractiveConfirm
} from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageMediaInteractiveWidget from '../MessageMediaInteractiveWidget/MessageMediaInteractiveWidget';

export type Props = {
  action: MessageMediaInteractiveActionType,
  onSubmit?: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
};

class MessageMediaInteractiveAction extends PureComponent<Props> {
  handleSubmit = (value: string) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.action.id, value, this.props.action.confirm);
    }
  };

  render() {
    const { action } = this.props;

    return <MessageMediaInteractiveWidget style={action.style} widget={action.widget} onSubmit={this.handleSubmit} />;
  }
}

export default MessageMediaInteractiveAction;
