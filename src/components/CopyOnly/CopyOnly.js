/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import styles from './CopyOnly.css';

type Props = {
  block?: boolean,
  children?: mixed
};

function CopyOnly(props: Props): React.Element<any> {
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
