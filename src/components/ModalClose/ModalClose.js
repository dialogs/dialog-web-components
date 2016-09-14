/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from '../Modal/Modal.css';

/**
 * Close modal button
 */
class ModalClose extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.onClick !== this.props.onClick ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { className, onClick } = this.props;
    const closeClassName = classNames(styles.close, className);

    return (
      <Icon glyph="close" className={closeClassName} onClick={onClick} />
    );
  }
}

export default ModalClose;
