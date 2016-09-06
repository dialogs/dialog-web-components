/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

class ModalFooter extends Component {
  static propTypes = {
    className: PropTypes.string,
    withBorder: PropTypes.bool,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    withBorder: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.withBorder !== this.props.withBorder ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { children, withBorder, className } = this.props;
    const footerClassName = classNames(styles.footer, {
      [styles.border]: withBorder
    }, className);

    return (
      <footer className={footerClassName}>
        {children}
      </footer>
    );
  }
}

export default ModalFooter;
