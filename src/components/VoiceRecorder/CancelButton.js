/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './CancelButton.css';

export type Props = {
  className?: string,
  onClick?: (event: SyntheticEvent<>) => mixed
};

class CancelButton extends PureComponent<Props> {
  renderIcon = () => (
    <svg viewBox="0 0 24 24" className={styles.icon}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );

  render() {
    const { onClick } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <span className={className} onClick={onClick}>
        {this.renderIcon()}
      </span>
    );
  }
}

export default CancelButton;
