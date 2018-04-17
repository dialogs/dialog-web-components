/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

export type Props = {
  className?: string,
  withBorder?: boolean,
  children: React.Node
};

function ModalFooter(props: Props) {
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
