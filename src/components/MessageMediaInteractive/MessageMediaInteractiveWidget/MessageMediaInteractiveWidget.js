/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMediaInteractiveStyle,
  MessageMediaInteractiveWidget as MessageMediaInteractiveWidgetType
} from '@dlghq/dialog-types';
import * as React from 'react';
import MessageMediaInteractiveWidgetButton from './MessageMediaInteractiveWidgetButton';
import MessageMediaInteractiveWidgetSelect from './MessageMediaInteractiveWidgetSelect';

export type Props = {
  style?: ?MessageMediaInteractiveStyle,
  widget: MessageMediaInteractiveWidgetType,
  onSubmit: (value: string) => mixed
};

function MessageMediaInteractiveWidget(props: Props) {
  switch (props.widget.type) {
    case 'button':
      return (
        <MessageMediaInteractiveWidgetButton
          style={props.style}
          widget={props.widget}
          onSubmit={props.onSubmit}
        />
      );

    case 'select':
      return (
        <MessageMediaInteractiveWidgetSelect
          style={props.style}
          widget={props.widget}
          onSubmit={props.onSubmit}
        />
      );

    default:
      return null;
  }
}

export default MessageMediaInteractiveWidget;
