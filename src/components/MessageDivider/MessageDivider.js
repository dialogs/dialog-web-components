/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './MessageDivider.css';

export type Props = {
  className?: string,
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning',
  children?: React.Element<any>
};

class MessageDivider extends PureComponent {
  props: Props;

  static defaultProps = {
    theme: 'default'
  };

  render() {
    const className = classNames(
      styles.container,
      styles[this.props.theme],
      this.props.className
    );

    return (
      <div className={className}>
        <div className={styles.text}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MessageDivider;
