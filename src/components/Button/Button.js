/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './Button.css';

export type Props = {
  id?: string,
  className?: string,
  children: Node,
  disabled: boolean,
  wide: boolean,
  rounded: boolean,
  loading: boolean,
  form?: string,
  view: 'button' | 'outline' | 'link',
  type: 'submit' | 'reset' | 'button' | 'menu',
  theme: ColorTheme,
  size: 'small' | 'normal' | 'large',
  onClick?: (event: SyntheticEvent<>) => mixed
};

class Button extends PureComponent<Props> {
  static defaultProps = {
    type: 'button',
    theme: 'default',
    view: 'button',
    size: 'normal',
    wide: false,
    rounded: true,
    loading: false,
    disabled: false
  };

  renderLoading() {
    const { loading, size } = this.props;

    if (!loading) {
      return null;
    }

    return <Spinner type="dotted" className={styles.spinner} size={size} />;
  }

  render() {
    const { id, type, form, disabled, theme, size, wide, rounded, children, view, loading } = this.props;
    const className = classNames(
      styles.container,
      styles[theme],
      styles[view],
      styles[size],
      {
        [styles.wide]: wide,
        [styles.rounded]: rounded,
        [styles.pending]: loading
      },
      this.props.className
    );

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        id={id}
        className={className}
        type={type}
        form={form}
        disabled={disabled || loading}
        onClick={this.props.onClick}
      >
        {children}
        {this.renderLoading()}
      </button>
    );
  }
}

export default Button;
