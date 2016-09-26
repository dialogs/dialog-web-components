/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './ActivityList.css';

class ActivityList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default ActivityList;
