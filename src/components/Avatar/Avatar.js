/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';

import React, { Component } from 'react';
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

class Avatar extends Component {
  props: Props;

  static defaultProps = {
    size: 'medium',
    placeholder: 'empty'
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.image !== this.props.image ||
           nextProps.title !== this.props.title ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.size !== this.props.size ||
           nextProps.className !== this.props.className;
  }

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
    const { image, placeholder, title, size, onClick, className } = this.props;
    const avatarText = this.getAvatarText();

    const avatarClassName = classNames({
      [styles.image]: image,
      [styles.placeholder]: !image,
      [styles[placeholder]]: !image,
      [styles[size]]: true,
      [styles.twoChars]: avatarText && avatarText.length !== 1,
      [styles.clickable]: onClick
    }, className);

    if (image) {
      const imgSize = SIZES[size];

      return (
        <img
          className={avatarClassName}
          src={image}
          width={imgSize}
          height={imgSize}
          alt={title}
          onClick={onClick}
        />
      );
    }

    return (
      <div className={avatarClassName} onClick={onClick} title={title}>
        {avatarText}
      </div>
    );
  }
}

export default Avatar;
