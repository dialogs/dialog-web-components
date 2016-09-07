/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Toolbar.css';

class Toolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { className, children } = this.props;
    const infoClassName = classNames(styles.root, className);

    return (
      <div className={infoClassName}>
        {children}
      </div>
    );
  }
}

export default Toolbar;
