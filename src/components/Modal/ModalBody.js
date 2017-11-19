/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

export type Props = {
  className?: string,
  children: React.Node
};

function ModalBody(props: Props) {
  const className = classNames(styles.body, props.className);

  return (
    <section className={className}>
      {props.children}
    </section>
  );
}

export default ModalBody;
