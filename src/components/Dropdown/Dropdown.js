/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

export type Props = {
  className?: string,
  children?: any,
  theme: 'primary' | 'secondary',
  style?: Object
};

class Dropdown extends PureComponent {
  props: Props;

  static defaultProps = {
    theme: 'primary'
  };

  render(): React.Element<any> {
    const { theme, style } = this.props;
    const className = classNames(styles.container, styles[theme], this.props.className);

    return (
      <div className={className} style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default Dropdown;
