/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

class ModalHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { children, className } = this.props;
    const headerClassName = classNames(styles.header, className);

    return (
      <header className={headerClassName}>
        {children}
      </header>
    );
  }
}

export default ModalHeader;
