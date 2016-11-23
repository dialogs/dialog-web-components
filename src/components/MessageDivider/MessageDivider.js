/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './MessageDivider.css';

export type Props = {
  className?: string,
  theme: 'primary' | 'success' | 'danger' | 'info' | 'warning',
  children: React.Element<any>
};

class MessageDivider extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const { theme, children } = this.props;
    const className = classNames(styles.container, {
      [styles[theme]]: theme
    }, this.props.className);

    return (
      <div className={className}>
        <div className={styles.text}>{children}</div>
      </div>
    );
  }
}

export default MessageDivider;
