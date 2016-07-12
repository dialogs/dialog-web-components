import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Button.css';

class Button extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
    wide: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['submit', 'reset', 'button', 'menu']).isRequired,
    theme: PropTypes.oneOf(['primary', 'link']).isRequired,
    size: PropTypes.oneOf(['small', 'normal', 'large']).isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'button',
    theme: 'primary',
    size: 'normal',
    wide: false,
    disabled: false
  };

  shouldComponentUpdate(prevProps) {
    return prevProps.children !== this.props.children ||
           prevProps.disabled !== this.props.disabled ||
           prevProps.type !== this.props.type ||
           prevProps.size !== this.props.size ||
           prevProps.theme !== this.props.theme ||
           prevProps.wide !== this.props.wide ||
           prevProps.className !== this.props.className ||
           prevProps.id !== this.props.id ||
           prevProps.name !== this.props.name;
  }

  render() {
    const className = classNames(
      styles.button,
      styles[this.props.theme],
      styles[this.props.size],
      { [styles.wide]: this.props.wide },
      this.props.className
    );

    return (
      <button
        id={this.props.id}
        name={this.props.name}
        className={className}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
