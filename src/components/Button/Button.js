import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Button.css'

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
      'flat', 'rised', 'shade'
    ]).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'flat'
  };


  render() {
    const { type, size, disabled, onClick } = this.props;

    const className = classNames(
      styles.container,
      styles[type],
      styles[size],
      this.props.className
    );

    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
