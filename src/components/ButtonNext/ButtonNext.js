/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './ButtonNext.css';

export type Props = {
  id?: string,
  className?: string,
  children: Node,
  disabled: boolean,
  wide: boolean,
  rounded: boolean,
  loading: boolean,
  type: 'submit' | 'reset' | 'button' | 'menu',
  size: 'small' | 'normal' | 'large',
  onClick?: (event: SyntheticEvent<>) => any
}

class ButtonNext extends PureComponent<Props> {
  static defaultProps = {
    type: 'button',
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

    return (
      <Spinner type="round" className={styles.spinner} size={size} />
    );
  }

  render() {
    const { id, type, disabled, wide, rounded, children, loading, size } = this.props;
    const className = classNames(styles.container, styles[size], {
      [styles.wide]: wide,
      [styles.rounded]: rounded,
      [styles.loading]: loading
    }, this.props.className);

    return (
      <button
        id={id}
        className={className}
        type={type}
        disabled={disabled || loading}
        onClick={this.props.onClick}
      >
        {
          loading
            ? this.renderLoading()
            : children
        }
      </button>
    );
  }
}

export default ButtonNext;
