/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import type { AvatarSize } from './utils/getAvatarSize';
import type { Gradient } from './utils/getAvatarColor';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarSize from './utils/getAvatarSize';
import getAvatarText from './utils/getAvatarText';
import getAvatarColor from './utils/getAvatarColor';
import styles from './Avatar.css';

export type Props = {
  className?: string,
  image: ?string,
  title: string,
  size: AvatarSize,
  placeholder: AvatarPlaceholder,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

class Avatar extends PureComponent<Props, void> {
  props: Props;

  static defaultProps = {
    size: 'medium',
    placeholder: 'empty'
  };

  getAvatarText(): string {
    return getAvatarText(this.props.title);
  }

  getAvatarSize(): number {
    return getAvatarSize(this.props.size);
  }

  getAvatarColor(): Gradient {
    return getAvatarColor(this.props.placeholder);
  }

  render() {
    const { image, title } = this.props;
    const size = this.getAvatarSize();
    const text = size >= 20 ? this.getAvatarText() : null;
    const twoChars = Boolean(text && text.length !== 1);

    const className = classNames(
      this.props.className,
      this.props.onClick ? styles.clickable : null,
      image ? styles.withImage : styles.withPlaceholder
    );

    if (image) {
      return (
        <div
          style={{ width: size, height: size }}
          title={title}
          onClick={this.props.onClick}
          className={className}
        >
          <img
            className={styles.image}
            src={image}
            alt={title}
            width={size}
            height={size}
            style={{ width: size, height: size }}
          />
        </div>
      );
    }

    const colors = this.getAvatarColor();

    const style = {
      width: size,
      height: size,
      lineHeight: `${size}px`,
      fontSize: Math.min(Math.floor(twoChars ? size / 2.4 : size / 1.9), 60),
      backgroundImage: `linear-gradient(38deg, ${colors.payload.from}, ${colors.payload.to})`
    };

    return (
      <div className={className} title={title} style={style} onClick={this.props.onClick}>
        {text}
      </div>
    );
  }
}

export default Avatar;
