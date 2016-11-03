/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Spinner.css';

export type Props = {
  className?: string,
  type: 'round' | 'wave' | 'dotted',
  size: 'small' | 'normal' | 'large'
};

function Spinner(props: Props): ?React.Element<any> {
  const { size, type } = props;
  const className = classNames(styles[type], styles[size], props.className);

  switch (type) {
    case 'wave':
      return (
        <div className={className}>
          <div className={styles.stick} />
          <div className={styles.stick} />
          <div className={styles.stick} />
          <div className={styles.stick} />
          <div className={styles.stick} />
        </div>
      );

    case 'round':
      return (
        <div className={className} />
      );

    case 'dotted':
      return (
        <div className={className}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      );

    default:
      return null;
  }
}

export default Spinner;
