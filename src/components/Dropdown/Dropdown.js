import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

class Dropdown extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    theme: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    theme: 'primary'
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isOpen !== this.props.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.theme !== this.props.theme ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { isOpen, theme, className } = this.props;
    const dropdownClassName = classNames(styles.root, styles[theme], {
      [styles.opened]: isOpen
    }, className);

    return (
      <div className={dropdownClassName}>
        {this.props.children}
      </div>
    );
  }
}

export default Dropdown;
