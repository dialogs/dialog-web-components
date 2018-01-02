/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { IconSize } from './getIconSize';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getIconSize from './getIconSize';
import styles from './Icon.css';

// $FlowFixMe
const files = require.context('./svg', false, /.*\.svg$/);
files.keys().forEach(files);

export type Props = {
  id?: string,
  className?: string,
  glyph: string,
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning',
  size: IconSize,
  inverted: boolean,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

class Icon extends PureComponent<Props> {
  static defaultProps = {
    size: getIconSize('default'),
    theme: 'default',
    inverted: false
  };

  getIconSize(): number {
    return getIconSize(this.props.size);
  }

  getIconPadding(): number {
    const size = this.getIconSize();

    if (size < 20) {
      return 2;
    } else if (size >= 20 && size <= 40) {
      return 4;
    }

    return 6;
  }

  renderInvertedIcon() {
    const { onClick, theme } = this.props;
    const size = this.getIconSize();
    const className = classNames(styles.container, styles.inverted, {
      [styles[theme]]: theme,
      [styles.clickable]: onClick
    }, this.props.className);
    const style = {
      width: size,
      height: size,
      padding: this.getIconPadding()
    };

    return (
      <div className={className} onClick={onClick} style={style} id={this.props.id}>
        <svg className={styles.icon} width="100%" height="100%">
          <use xlinkHref={`#${this.props.glyph}`} />
        </svg>
      </div>
    );
  }

  renderIcon() {
    const { onClick, theme } = this.props;
    const size = this.getIconSize();
    const className = classNames(styles.container, {
      [styles[theme]]: theme,
      [styles.clickable]: onClick
    }, this.props.className);

    return (
      <svg
        className={className} width={size} height={size} onClick={onClick}
        id={this.props.id}
      >
        <use xlinkHref={`#${this.props.glyph}`} />
      </svg>
    );
  }

  render() {
    if (this.props.inverted) {
      return this.renderInvertedIcon();
    }

    return this.renderIcon();
  }
}

export default Icon;
