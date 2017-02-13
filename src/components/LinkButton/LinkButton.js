/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../Button/Button.css';

export type Props = {
  className?: string,
  children?: any,
  wide: boolean,
  rounded: boolean,
  view: 'button' | 'outline' | 'link',
  theme:'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'link',
  size: 'small' | 'normal' | 'large',
  href: string,
  target?: string
}

class LinkButton extends PureComponent {
  props: Props;

  static defaultProps = {
    theme: 'default',
    view: 'button',
    size: 'normal',
    wide: false,
    rounded: true
  };

  render(): React.Element<any> {
    const { theme, size, wide, rounded, children, view, target, href } = this.props;
    const className = classNames(styles.container, styles[theme], styles[view], styles[size], {
      [styles.wide]: wide,
      [styles.rounded]: rounded
    }, this.props.className);

    return (
      <a href={href} target={target} className={className}>
        {children}
      </a>
    );
  }
}

export default LinkButton;
