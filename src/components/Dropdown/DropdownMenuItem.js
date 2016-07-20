import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

class DropdownMenuItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  handleMenuItemClick(event) {
    const { onClick } = this.props;

    if (onClick) {
      onClick(event);
    }
  }

  render() {
    const className = classNames(styles.item, this.props.className);

    return (
      <div className={className} onClick={this.handleMenuItemClick}>
        {this.props.children}
      </div>
    );
  }
}

export default DropdownMenuItem;
