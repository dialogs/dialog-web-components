/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  children: React.Node
};

function ToolbarButtons(props: Props) {
  const className = classNames(styles.buttons, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default ToolbarButtons;
