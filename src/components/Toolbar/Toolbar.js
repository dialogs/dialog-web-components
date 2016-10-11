/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  children?: React.Element<any>
};

function Toolbar(props: Props): React.Element<any> {
  const className = classNames(styles.root, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default Toolbar;
