/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';

export type Theme = 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning';

export type Props = {
  className?: string,
  style?: Object,
  glyph: string,
  size: 'small' | 'normal' | 'large',
  theme: Theme,
  flat: boolean,
  disabled: boolean,
  active?: boolean,
  onClick: (event: SyntheticMouseEvent) => any
};

class IconButton extends PureComponent {
  props: Props;

  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default',
    disabled: false
  };

  render() {
    const { glyph, className, theme, size, disabled, flat, style, active, ...otherProps } = this.props;

    const buttonClassName = classNames(styles.container, styles[size], {
      [styles.disabled]: disabled,
      [styles.defaultStyle]: !flat,
      [styles.flat]: flat,
      [styles[theme]]: flat,
      [styles.active]: active
    }, className);

    return (
      <button
        className={buttonClassName}
        onClick={this.props.onClick}
        disabled={disabled}
        style={style}
        {...otherProps}
      >
        <span className={styles.fix}>
          <Icon glyph={glyph} className={styles.icon} />
        </span>
      </button>
    );
  }
}

export default IconButton;
