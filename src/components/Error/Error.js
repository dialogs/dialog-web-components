/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Error.css';

export type Props = {
  className?: string,
  children?: Node
};

function Error(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default Error;
