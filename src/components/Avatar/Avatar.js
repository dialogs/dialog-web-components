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

export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'super';

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

  render(): React.Element<any> {
    const { image, placeholder, title, size } = this.props;
    const avatarText = this.getAvatarText();

    const avatarClassName = classNames({
      [styles.image]: image,
      [styles.placeholder]: !image,
      [styles[placeholder]]: !image,
      [styles[size]]: true,
      [styles.twoChars]: avatarText && avatarText.length !== 1
    }, this.props.className);

    if (image) {
      const imgSize = SIZES[size];

      if (this.props.onClick) {
        return (
          <div onClick={this.props.onClick} className={styles.clickable}>
            <img
              className={avatarClassName}
              src={image}
              width={imgSize}
              height={imgSize}
              alt={title}
            />
          </div>
        );
      }

      return (
        <img
          className={avatarClassName}
          src={image}
          width={imgSize}
          height={imgSize}
          alt={title}
        />
      );
    }

    if (this.props.onClick) {
      return (
        <div onClick={this.props.onClick} className={styles.clickable}>
          <div className={avatarClassName} title={title}>{avatarText}</div>
        </div>
      );
    }

    return (
      <div className={avatarClassName} title={title}>{avatarText}</div>
    );
  }
}

export default Avatar;
