import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

export type Props = {
  isOpen: boolean,
  children: any,
  theme: 'primary' | 'secondary',
  className?: string,
  style: any
};

class Dropdown extends Component {
  props: Props;

  static defaultProps = {
    theme: 'primary'
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isOpen !== this.props.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.theme !== this.props.theme ||
           nextProps.style !== this.props.style ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { isOpen, theme, className, style } = this.props;
    const dropdownClassName = classNames(styles.container, styles[theme], {
      [styles.opened]: isOpen
    }, className);

    return (
      <div className={dropdownClassName} style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default Dropdown;
