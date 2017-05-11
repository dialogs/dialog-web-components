/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarMessagesButton.css';

export type Props = {
  className?: string,
  onClick: () => void,
  active: boolean
};

function ToolbarMessagesButton(props: Props): React.Element<any> {
  const className = classNames(styles.container, {
    [styles.active]: props.active
  }, props.className);

  return (
    <Icon
      className={className}
      onClick={props.onClick}
      glyph="message"
      size={26}
    />
  );
}

export default ToolbarMessagesButton;
