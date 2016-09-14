/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../Modal/Modal.css';

class ModalBody extends Component {
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
    const bodyClassName = classNames(styles.body, className);

    return (
      <section className={bodyClassName}>
        {children}
      </section>
    );
  }
}

export default ModalBody;
