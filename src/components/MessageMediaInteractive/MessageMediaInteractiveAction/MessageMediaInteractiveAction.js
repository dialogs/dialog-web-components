/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractiveAction as MessageMediaInteractiveActionType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageMediaInteractiveWidget from '../MessageMediaInteractiveWidget/MessageMediaInteractiveWidget';

export type Props = {
  action: MessageMediaInteractiveActionType,
  onSubmit?: (id: string, value: string) => mixed
};

class MessageMediaInteractiveAction extends PureComponent {
  props: Props;

  handleSubmit = (value: string) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.action.id, value);
    }
  };

  render() {
    const { action } = this.props;

    return (
      <MessageMediaInteractiveWidget
        style={action.style}
        widget={action.widget}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default MessageMediaInteractiveAction;
