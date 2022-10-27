/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

export type Props = {
  className?: string,
  withBorder?: boolean,
  children?: React.Element<any>
};

function ModalHeader(props: Props): React.Element<any> {
  const className = classNames(styles.header, {
    [styles.border]: props.withBorder
  }, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default ModalHeader;
