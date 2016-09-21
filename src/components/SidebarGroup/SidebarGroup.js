/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './SidebarGroup.css';

class SidebarGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.title !== this.props.title ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { title, children } = this.props;
    const className = classNames(styles.root, this.props.className);

    return (
      <div className={className}>
        <div className={styles.title}>{title}</div>
        {children}
      </div>
    );
  }
}

export default SidebarGroup;
