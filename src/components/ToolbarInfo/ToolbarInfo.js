/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../Toolbar/Toolbar.css';

class Toolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      presence: PropTypes.string
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
           nextProps.info !== this.props.info;
  }

  render() {
    const { className, info: { name, presence } } = this.props;
    const infoClassName = classNames(styles.info, className);

    return (
      <div className={infoClassName}>
        <div className={styles.name}>{name}</div>
        <div className={styles.presence}>{presence}</div>
      </div>
    );
  }
}

export default Toolbar;
