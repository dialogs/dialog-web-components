/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';

export type Theme = 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning';

export type Props = {
  className?: string,
  style?: any,
  glyph: string,
  size: 'small' | 'normal' | 'large',
  theme: Theme,
  flat: boolean,
  disabled: boolean,
  onClick: Function
}

class IconButton extends Component {
  props: Props;

  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default',
    disabled: false
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.glyph !== this.props.glyph ||
           nextProps.size !== this.props.size ||
           nextProps.flat !== this.props.flat ||
           nextProps.theme !== this.props.theme ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.onClick !== this.props.onClick ||
           nextProps.style !== this.props.style ||
           nextProps.className !== this.props.className;
  }

  render(): React.Element<any> {
    const { glyph, className, theme, size, disabled, flat, style } = this.props;

    const buttonClassName = classNames(styles.container, styles[size], {
      [styles.disabled]: disabled,
      [styles.defaultStyle]: !flat,
      [styles.flat]: flat,
      [styles[theme]]: flat
    }, className);

    return (
      <button
        className={buttonClassName}
        onClick={this.props.onClick}
        disabled={disabled}
        style={style}
      >
        <Icon glyph={glyph} className={styles.icon} />
      </button>
    );
  }
}

export default IconButton;
