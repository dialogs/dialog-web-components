/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

export type Props = {
  isOpen: boolean,
  children: any,
  theme: 'primary' | 'secondary',
  className?: string
};

class Dropdown extends Component {
  props: Props;

  static defaultProps = {
    theme: 'primary'
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.isOpen !== this.props.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.theme !== this.props.theme ||
           nextProps.className !== this.props.className;
  }

  render(): React.Element<any> {
    const { isOpen, theme, className } = this.props;
    const dropdownClassName = classNames(styles.container, styles[theme], {
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
