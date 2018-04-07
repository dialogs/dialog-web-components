/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from '../IconButton/IconButton.css';

export type Props = {
  className?: string,
  id?: string,
  style?: Object,
  glyph: string,
  size: 'small' | 'normal' | 'large',
  theme: ColorTheme,
  flat: boolean,
  active: boolean,
  target?: string,
  href: string
};

class LinkIconButton extends PureComponent<Props> {
  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default'
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
    const { theme, size, flat, style, active, href, target, id, ...otherProps } = this.props;

    const className = classNames(
      styles.container,
      styles[size],
      {
        [styles.defaultStyle]: !flat,
        [styles.flat]: flat,
        [styles[theme]]: flat,
        [styles.active]: active
      },
      this.props.className
    );

    return (
      <a
        href={href} target={target} className={className} style={style}
        id={id} {...otherProps}
      >
        <span className={styles.fix}>
          {this.renderIcon()}
        </span>
      </a>
    );
  }
}

export default LinkIconButton;
