/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './StopButton.css';

export type Props = {
  className?: string,
  onClick?: (event: SyntheticEvent<>) => mixed
};

class StopButton extends PureComponent<Props> {
  renderIcon = () => (
    <svg viewBox="0 0 24 24" className={styles.icon}>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
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

export default StopButton;
