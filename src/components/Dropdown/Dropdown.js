import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

class Dropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { isOpen } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.opened]: isOpen
    });

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Dropdown;
