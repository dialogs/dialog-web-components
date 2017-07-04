/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { AvatarSize } from '../Avatar/getAvatarSize';
import type { Gradient } from '../Avatar/getAvatarColor';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarSize from '../Avatar/getAvatarSize';
import getAvatarText from '../Avatar/getAvatarText';
import getAvatarColor from '../Avatar/getAvatarColor';
import createSequence from '../../utils/createSequence';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import styles from './PeerAvatar.css';

export type Props = {
  className?: string,
  peer: PeerInfo,
  size: AvatarSize,
  online?: ?boolean,
  onClick?: (event: SyntheticMouseEvent) => any
};

type DefaultProps = {
  size: AvatarSize
};

const seq = createSequence();

class PeerAvatar extends PureComponent<DefaultProps, Props, void> {
  id: string;

  static defaultProps = {
    size: 'medium'
  };

  constructor(props: Props) {
    super(props);

    this.id = 'peer_avatar_' + seq.next();
  }

  getAvatarSize(): number {
    return getAvatarSize(this.props.size);
  }

  getAvatarText(): string {
    return getAvatarText(this.props.peer.title);
  }

  getAvatarColor(): Gradient {
    const placeholder = getAvatarPlaceholder(this.props.peer.peer.id);

    return getAvatarColor(placeholder);
  }

  getAvatarImage(): ?string {
    if (this.getAvatarSize() >= 100) {
      return this.props.peer.bigAvatar || this.props.peer.avatar;
    }

    return this.props.peer.avatar;
  }

  renderDefs() {
    const avatar = this.getAvatarImage();
    if (avatar) {
      return (
        <pattern id={this.id} width="100%" height="100%" patternUnits="objectBoundingBox">
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlinkHref={avatar}
          />
        </pattern>
      );
    }

    const colors = this.getAvatarColor();

    return (
      <linearGradient
        id={this.id}
        gradientUnits="userSpaceOnUse"
        x1="6.79%"
        y1="105.31%"
        x2="93.21%"
        y2="-5.31%"
      >
        <stop stopColor={colors.payload.from} />
        <stop offset="1" stopColor={colors.payload.to} />
      </linearGradient>
    );
  }

  renderMask() {
    if (!this.props.online) {
      return (
        <circle fill={`url(#${this.id})`} cx="50" cy="50" r="50" />
      );
    }

    return (
      <path
        // eslint-disable-next-line
        d="M68.393 96.508C62.7 98.762 56.495 100 50 100 22.386 100 0 77.614 0 50S22.386 0 50 0s50 22.386 50 50c0 6.495-1.238 12.7-3.492 18.393C93.083 65.643 88.734 64 84 64c-11.046 0-20 8.954-20 20 0 4.734 1.644 9.083 4.393 12.508z"
        fill={`url(#${this.id})`}
      />
    );
  }

  renderText() {
    const avatar = this.getAvatarImage();
    if (avatar) {
      return null;
    }

    const size = this.getAvatarSize();
    const text = size >= 20 ? this.getAvatarText() : null;
    const twoChars = Boolean(text && text.length !== 1);
    const textStyles = {
      fontSize: twoChars ? 38 : 48
    };

    return (
      <text
        className={styles.text}
        x="50%"
        y="51%"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
        style={textStyles}
      >
        {text}
      </text>
    );
  }

  renderOnline() {
    if (!this.props.online) {
      return null;
    }

    return (
      <circle cx="84" cy="84" r="15" className={styles.online} />
    );
  }

  render() {
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.onClick ? styles.clickable : null
    );

    const size = this.getAvatarSize();

    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        onClick={this.props.onClick}
      >
        <defs>
          {this.renderDefs()}
        </defs>
        {this.renderMask()}
        {this.renderText()}
        {this.renderOnline()}
      </svg>
    );
  }
}

export default PeerAvatar;
