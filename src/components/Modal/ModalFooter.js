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

function ModalFooter(props: Props): React.Element<any> {
  const className = classNames(
    styles.footer,
    { [styles.border]: props.withBorder },
    props.className
  );

  return (
    <footer className={className}>
      {props.children}
    </footer>
  );
}

export default ModalFooter;
