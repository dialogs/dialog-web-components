/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './Button.css';

export type Props = {
  id?: string,
  className?: string,
  children?: mixed,
  disabled: boolean,
  wide: boolean,
  rounded: boolean,
  loading: boolean,
  form?: string,
  view: 'button' | 'outline' | 'link' | 'next',
  type: 'submit' | 'reset' | 'button' | 'menu',
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'link',
  size: 'small' | 'normal' | 'large',
  onClick?: (event: SyntheticEvent) => any
}

class Button extends PureComponent {
  props: Props;

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

  renderLoading(): ?React.Element<any> {
    const { loading, size } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <Spinner type="dotted" className={styles.loading} size={size} />
    );
  }

  render(): React.Element<any> {
    const { id, type, form, disabled, theme, size, wide, rounded, children, view, loading } = this.props;
    const className = classNames(styles.container, styles[theme], styles[view], styles[size], {
      [styles.wide]: wide,
      [styles.rounded]: rounded
    }, this.props.className);

    return (
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
