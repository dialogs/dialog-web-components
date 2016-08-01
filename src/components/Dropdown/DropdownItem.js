import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

class DropdownItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.onClick !== this.props.onClick;
  }

  render() {
    const className = classNames(styles.item, this.props.className);

    return (
      <div className={className} onClick={this.props.onClick}>
        <span className={styles.text}>{this.props.children}</span>
      </div>
    );
  }
}

export default DropdownItem;
