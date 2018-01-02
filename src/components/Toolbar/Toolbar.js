/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  children: React.Node
};

function Toolbar(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default Toolbar;
