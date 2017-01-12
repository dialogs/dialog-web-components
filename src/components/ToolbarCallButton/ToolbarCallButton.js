/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarCallButton.css';

export type Props = {
  className?: string,
  onClick: () => void,
  disabled: boolean
};

function ToolbarCallButton(props: Props): React.Element<any> {
  const className = classNames(styles.container, {
    [styles.disabled]: props.disabled
  }, props.className);

  if (props.disabled) {
    return (
      <div className={className}>
        <Icon glyph="phone_outline" className={styles.icon} />
      </div>
    );
  }

  return (
    <div className={className} onClick={props.onClick}>
      <Icon glyph="phone_outline" className={styles.icon} />
    </div>
  );
}

export default ToolbarCallButton;

