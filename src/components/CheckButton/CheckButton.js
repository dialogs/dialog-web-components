/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './CheckButton.css';

export type Props = {
  className?: string,
  id?: string,
  checked: boolean,
  theme: ColorTheme,
  size: number,
  stopPropagation: boolean,
  onClick?: (checked: boolean) => mixed
};

class CheckButton extends PureComponent<Props> {
  static defaultProps = {
    size: 26,
    theme: 'primary',
    stopPropagation: false
  };

  handleClick = (event: SyntheticMouseEvent<>) => {
    if (this.props.stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.props.onClick) {
      this.props.onClick(!this.props.checked);
    }
  };

  render() {
    const { checked, theme, size, id } = this.props;
    const className = classNames(
      styles.container,
      styles[theme],
      {
        [styles.checked]: checked
      },
      this.props.className
    );

    const padding = 4;
    const tickSize = this.props.size - (padding * 2);
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      padding: `${padding}px`
    };

    return (
      <div className={className} onClick={this.handleClick} style={style} id={id}>
        {checked ? <Icon className={styles.icon} glyph="done" size={tickSize} /> : null}
      </div>
    );
  }
}

export default CheckButton;
