/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractiveAction as MessageMediaInteractiveActionType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageMediaInteractiveWidget from '../MessageMediaInteractiveWidget/MessageMediaInteractiveWidget';

export type Props = {
  className?: string,
  action: MessageMediaInteractiveActionType
};

class MessageMediaInteractiveAction extends PureComponent {
  props: Props;

  render() {
    return (
      <MessageMediaInteractiveWidget
        widget={this.props.widget}
        style={this.props.style}
      />

    );
  }
}

export default MessageMediaInteractiveAction;
