import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../Dropdown/Dropdown.css';

class DropdownHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className;
  }

  render() {
    const { className, children } = this.props;
    const headerClassName = classNames(styles.header, className);

    return (
      <header className={headerClassName}>
        {children}
      </header>
    );
  }
}

export default DropdownHeader;
