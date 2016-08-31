/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

class ModalFooter extends Component {
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
    const footerClassName = classNames(styles.footer, className);

    return (
      <footer className={footerClassName}>
        {children}
      </footer>
    );
  }
}

export default ModalFooter;
