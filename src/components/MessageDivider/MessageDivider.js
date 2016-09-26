/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './MessageDivider.css';

class MessageDivider extends Component {
  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['primary', 'success', 'danger', 'info', 'warning']),
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.theme !== this.props.theme ||
           nextProps.className !== this.props.className;
  }

  render() {
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
