import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../Dropdown/Dropdown.css';

class DropdownItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.onClick !== this.props.onClick;
  }

  render() {
    const { className, onClick, children } = this.props;
    const dropdownItemClassName = classNames(styles.item, {
      [styles.hovered]: onClick
    }, className);

    return (
      <div className={dropdownItemClassName} onClick={onClick}>
        <span className={styles.text}>{children}</span>
      </div>
    );
  }
}

export default DropdownItem;
