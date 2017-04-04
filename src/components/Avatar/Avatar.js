/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import type { AvatarSize } from './getAvatarSize';
import type { Gradient } from './getAvatarColor';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarSize from './getAvatarSize';
import getAvatarText from './getAvatarText';
import getAvatarColor from './getAvatarColor';
import styles from './Avatar.css';

export type Props = {
  className?: string,
  image: ?string,
  title: string,
  size: AvatarSize,
  placeholder: AvatarPlaceholder,
  onClick?: (event: SyntheticMouseEvent) => any
};

type DefaultProps = {
  size: AvatarSize,
  placeholder: AvatarPlaceholder
};

class Avatar extends PureComponent<DefaultProps, Props, void> {
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

  render(): React.Element<any> {
    const { image, title } = this.props;
    const size = this.getAvatarSize();
    const text = size >= 20 ? this.getAvatarText() : null;
    const twoChars = Boolean(text && text.length !== 1);

    const className = classNames(
      this.props.className,
      image ? styles.image : styles.placeholder,
      this.props.onClick ? styles.clickable : null
    );

    if (image) {
      return (
        <img
          className={className}
          src={image}
          alt={title}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          onClick={this.props.onClick}
        />
      );
    }

    const colors = this.getAvatarColor();

    const style = {
      width: size,
      height: size,
      fontSize: Math.min(Math.floor(twoChars ? (size / 2.4) : (size / 1.9)), 60),
      backgroundImage: `linear-gradient(38deg, ${colors.payload.from}, ${colors.payload.to})`
    };

    return (
      <div
        className={className}
        title={title}
        style={style}
        onClick={this.props.onClick}
      >
        {text}
      </div>
    );
  }
}

export default Avatar;
