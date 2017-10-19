/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaInteractiveWidget as MessageMediaInteractiveWidgetType, MessageMediaInteractiveStyle } from '@dlghq/dialog-types';
import React from 'react';
import MessageMediaInteractiveWidgetButton from './MessageMediaInteractiveWidgetButton';
import MessageMediaInteractiveWidgetSelect from './MessageMediaInteractiveWidgetSelect';

export type Props = MessageMediaInteractiveWidgetType & {
  className?: string,
  style: MessageMediaInteractiveStyle
};

function MessageMediaInteractiveWidget(props: Props) {
  switch (props.widget.type) {
    case 'button':
      return (
        <MessageMediaInteractiveWidgetButton
          style={props.style}
          label={props.widget.label}
          value={props.widget.value}
        />
      );
    case 'select':
      return (
        <MessageMediaInteractiveWidgetSelect
          style={props.style}
          label={props.widget.label}
          value={props.widget.value}
          options={props.widget.options}
          defaultValue={props.widget.defaultValue}
        />
      );
    default:
      return null;
  }
}

export default MessageMediaInteractiveWidget;
