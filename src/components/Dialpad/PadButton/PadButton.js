/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PadButton.css';

type Props = {
  className?: string,
  value: string,
  onClick: (value: string) => mixed
};

class PadButton extends PureComponent<Props> {
  handleClick = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.button} onClick={this.handleClick}>
          {this.props.value.toUpperCase()}
        </div>
      </div>
    );
  }
}

export default PadButton;
