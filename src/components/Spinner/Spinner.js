/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Spinner.css';

export type Props = {
  className?: string,
  type: 'round' | 'wave' | 'dotted',
  size: 'small' | 'normal' | 'large'
};

class Spinner extends PureComponent {
  props: Props;

  static defaultProps = {
    type: 'round',
    size: 'small'
  };

  render() {
    const className = classNames(
      this.props.className,
      styles[this.props.type],
      styles[this.props.size]
    );

    switch (this.props.type) {
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

      case 'dotted':
        return (
          <div className={className}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        );

      default:
        return (
          <div className={className} />
        );
    }
  }
}

export default Spinner;
