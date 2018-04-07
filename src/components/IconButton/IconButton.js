/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';

export type Props = {
  className?: string,
  id?: string,
  style?: Object,
  glyph: string,
  size: 'small' | 'normal' | 'large',
  theme: ColorTheme,
  flat: boolean,
  disabled: boolean,
  active?: boolean,
  onClick: (event: SyntheticMouseEvent<>) => mixed
};

class IconButton extends PureComponent<Props> {
  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default',
    disabled: false
  };

  getIconSize = (): number => {
    const { size } = this.props;
    if (size === 'small') {
      return 16;
    }

    if (size === 'large') {
      return 30;
    }

    return 22;
  };

  renderIcon() {
    const { glyph } = this.props;
    const size = this.getIconSize();

    return <Icon glyph={glyph} className={styles.icon} size={size} />;
  }

  render() {
    const { className, theme, size, disabled, id, flat, style, active, ...otherProps } = this.props;

    const buttonClassName = classNames(
      styles.container,
      styles[size],
      {
        [styles.disabled]: disabled,
        [styles.defaultStyle]: !flat,
        [styles.flat]: flat,
        [styles[theme]]: flat,
        [styles.active]: active
      },
      className
    );

    return (
      <button
        className={buttonClassName}
        id={id}
        type="button"
        disabled={disabled}
        style={style}
        onClick={this.props.onClick}
        {...otherProps}
      >
        <span className={styles.fix}>
          {this.renderIcon()}
        </span>
      </button>
    );
  }
}

export default IconButton;
