/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './ToolbarInfoButton.css';

export type Props = {
  className?: string,
  onClick: () => void,
  active: boolean
};

function ToolbarInfoButton(props: Props) {
  const { active } = props;
  const className = classNames(styles.container, {
    [styles.outline]: !active,
    [styles.active]: active
  }, props.className);

  return (
    <div className={className} onClick={props.onClick} id="toolbar_info_button">
      <svg viewBox="0 0 4 12" className={styles.icon}>
        <g fillRule="evenodd">
          <rect width="4" height="8" y="4" rx="1" />
          <rect width="4" height="3" rx="1" />
        </g>
      </svg>
    </div>
  );
}

export default ToolbarInfoButton;
