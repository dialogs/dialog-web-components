/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './SidebarHeader.css';

class SidebarHeader extends Component {
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
    const sidebarHeaderClassName = classNames(styles.root, className);

    return (
      <div className={sidebarHeaderClassName}>
        {children}
      </div>
    );
  }
}

export default SidebarHeader;
