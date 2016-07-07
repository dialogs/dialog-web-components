import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Button.css';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
      'flat', 'rised', 'shade'
    ]).isRequired,
    size: PropTypes.oneOf([
      'small', 'normal', 'large'
    ]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'flat',
    size: 'normal'
  };

  shouldComponentUpdate(prevProps) {
    return prevProps.children !== this.props.children ||
           prevProps.type !== this.props.type ||
           prevProps.size !== this.props.size ||
           prevProps.disabled !== this.props.disabled ||
           prevProps.className !== this.props.className;
  }

  render() {
    const { type, size, disabled, onClick } = this.props;

    const className = classNames(
      styles.root,
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
