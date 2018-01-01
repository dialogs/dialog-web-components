/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import styles from './CopyOnly.css';

type Props = {
  block?: boolean,
  children?: Node
};

function CopyOnly(props: Props) {
  if (props.block) {
    return (
      <div className={styles.block}>
        <br />
        {props.children}
      </div>
    );
  }

  return (
    <span className={styles.inline}>
      {props.children}
    </span>
  );
}

export default CopyOnly;
