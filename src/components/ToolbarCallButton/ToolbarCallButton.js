/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarCallButton.css';

export type Props = {
  className?: string,
  disabled: boolean,
  onClick: (event: SyntheticMouseEvent<>) => mixed
};

function ToolbarCallButton(props: Props) {
  const className = classNames(styles.container, {
    [styles.disabled]: props.disabled
  }, props.className);

  if (props.disabled) {
    return (
      <div className={className} id="toolbar_call_button">
        <Icon glyph="phone_outline" className={styles.icon} />
      </div>
    );
  }

  return (
    <div className={className} id="toolbar_call_button" onClick={props.onClick}>
      <Icon glyph="phone_outline" className={styles.icon} />
    </div>
  );
}

export default ToolbarCallButton;
