/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../Toolbar/Toolbar.css';

class Toolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PropTypes.shape({
      peer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['user', 'group']).isRequired
      }).isRequired,
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      image: PropTypes.string,
      status: PropTypes.string
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
           nextProps.peerInfo !== this.props.peerInfo;
  }

  render() {
    const { className, peerInfo: { title, status } } = this.props;
    const infoClassName = classNames(styles.info, className);

    return (
      <div className={infoClassName}>
        <div className={styles.title}>{title}</div>
        <div className={styles.status}>{status}</div>
      </div>
    );
  }
}

export default Toolbar;
