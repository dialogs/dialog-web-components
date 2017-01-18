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
    return getAvatarColor(this.props.peer.placeholder);
  }

  renderDefs(): React.Element<any> {
    if (this.props.peer.avatar) {
      return (
        <pattern id={this.id} width="100%" height="100%" patternUnits="objectBoundingBox">
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlinkHref={this.props.peer.avatar}
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

  renderMask(): React.Element<any> {
    if (!this.props.online) {
      return (
        <circle fill={`url(#${this.id})`} cx="18" cy="18" r="18" />
      );
    }

    return (
      <path
        // eslint-disable-next-line
        d="M24.79 34.675C22.695 35.53 20.402 36 18 36 8.06 36 0 27.94 0 18S8.06 0 18 0s18 8.06 18 18c0 2.402-.47 4.695-1.325 6.79C33.435 23.677 31.797 23 30 23c-3.866 0-7 3.134-7 7 0 1.797.677 3.436 1.79 4.675z"
        fill={`url(#${this.id})`}
      />
    );
  }

  renderText(): ?React.Element<any> {
    if (this.props.peer.avatar) {
      return null;
    }

    const size = this.getAvatarSize();
    const text = size >= 20 ? this.getAvatarText() : null;
    const twoChars = Boolean(text && text.length !== 1);
    const textStyles = {
      fontSize: twoChars ? 14 : 18
    };

    return (
      <text
        className={styles.text}
        x="50%"
        y="51%"
        textAnchor="middle"
        alignmentBaseline="central"
        style={textStyles}
      >
        {text}
      </text>
    );
  }

  renderOnline(): ?React.Element<any> {
    if (!this.props.online) {
      return null;
    }

    return (
      <circle cx="30" cy="30" r="5" className={styles.online} />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, {
      [styles.clickable]: this.props.onClick
    }, this.props.className);
    const size = this.getAvatarSize();

    return (
      <svg
        viewBox="0 0 36 36"
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
