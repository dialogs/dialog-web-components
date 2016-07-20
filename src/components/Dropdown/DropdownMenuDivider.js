import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

class DropdownMenuDivider extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.divider, this.props.className);

    return (
      <div className={className} />
    );
  }
}

export default DropdownMenuDivider;
