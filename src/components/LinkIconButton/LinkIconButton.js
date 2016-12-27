/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from '../IconButton/IconButton.css';

export type Theme = 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning';

export type Props = {
  className?: string,
  style?: Object,
  glyph: string,
  size: 'small' | 'normal' | 'large',
  theme: Theme,
  flat: boolean,
  active: boolean,
  target?: string,
  href: string
}

class LinkIconButton extends PureComponent {
  props: Props;

  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default'
  };

  render(): React.Element<any> {
    const { glyph, theme, size, flat, style, active, href, target, ...otherProps } = this.props;

    const className = classNames(styles.container, styles[size], {
      [styles.defaultStyle]: !flat,
      [styles.flat]: flat,
      [styles[theme]]: flat,
      [styles.active]: active
    }, this.props.className);

    return (
      <a
        href={href}
        target={target}
        className={className}
        style={style}
        {...otherProps}
      >
        <Icon glyph={glyph} className={styles.icon} />
      </a>
    );
  }
}

export default LinkIconButton;
