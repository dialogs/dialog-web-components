/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Error.css';

export type Props = {
  className?: string,
  children?: string
};

function Error(props: Props): React.Element<any> {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default Error;
