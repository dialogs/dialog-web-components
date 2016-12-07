/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import isEmoji from '../../utils/isEmoji';
import styles from './Avatar.css';

const SIZES = {
  tiny: 14,
  small: 22,
  medium: 28,
  large: 36,
  big: 100,
  super: 150
};

export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'super' | number;

export type Props = {
  className?: string,
  image: ?string,
  title: ?string,
  size: AvatarSize,
  placeholder: AvatarPlaceholder,
  onClick?: (event: SyntheticMouseEvent) => any
};

class Avatar extends PureComponent {
  props: Props;

  static defaultProps = {
    size: 'medium',
    placeholder: 'empty'
  };

  getAvatarText(): ?string {
    const { title, size } = this.props;
    if (size === 'tiny') {
      return null;
    }

    if (title && title.length) {
      const titleArray = title.trim().split(' ');
      if (titleArray.length > 1) {
        return `${titleArray[0][0]}${titleArray[1][0]}`;
      }

      const char = title[0];
      if (!isEmoji(char)) {
        return char;
      }
    }

    return '#';
  }

  getAvatarSize(): number {
    const { size } = this.props;

    if (typeof size === 'number') {
      return size;
    }

    return SIZES[size];
  }

  render(): React.Element<any> {
    const { image, placeholder, title } = this.props;
    const avatarText = this.getAvatarText();

    const className = classNames({
      [styles.image]: image,
      [styles.placeholder]: !image,
      [styles[placeholder]]: !image,
      [styles.twoChars]: avatarText && avatarText.length !== 1
    }, this.props.className);


    const avatarSize = this.getAvatarSize();
    const avatarStyles = {
      width: avatarSize,
      height: avatarSize
    };

    if (image) {
      if (this.props.onClick) {
        return (
          <div onClick={this.props.onClick} className={styles.clickable}>
            <img
              className={className}
              style={avatarStyles}
              src={image}
              width={avatarSize}
              height={avatarSize}
              alt={title}
            />
          </div>
        );
      }

      return (
        <img
          className={className}
          style={avatarStyles}
          src={image}
          width={avatarSize}
          height={avatarSize}
          alt={title}
        />
      );
    }


    if (this.props.onClick) {
      return (
        <div onClick={this.props.onClick} className={styles.clickable}>
          <div className={className} title={title} style={avatarStyles}>{avatarText}</div>
        </div>
      );
    }

    return (
      <div className={className} title={title} style={avatarStyles}>{avatarText}</div>
    );
  }
}

export default Avatar;
