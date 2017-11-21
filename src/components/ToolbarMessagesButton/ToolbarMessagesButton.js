/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarMessagesButton.css';

export type Props = {
  className?: string,
  onClick: () => void,
  active: boolean
};

function ToolbarMessagesButton(props: Props) {
  const className = classNames(styles.container, {
    [styles.active]: props.active
  }, props.className);

  return (
    <Icon
      id="toolbar_messages_button"
      className={className}
      onClick={props.onClick}
      glyph="message"
      size={26}
    />
  );
}

export default ToolbarMessagesButton;
