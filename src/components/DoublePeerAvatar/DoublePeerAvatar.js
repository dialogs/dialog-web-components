/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { AvatarSize } from '../Avatar/utils/getAvatarSize';
import type { Gradient } from '../Avatar/utils/getAvatarColor';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarSize from '../Avatar/utils/getAvatarSize';
import getAvatarText from '../Avatar/utils/getAvatarText';
import getAvatarColor from '../Avatar/utils/getAvatarColor';
import createSequence from '../../utils/createSequence';
import styles from '../PeerAvatar/PeerAvatar.css';

export type Props = {
  className?: string,
  peerBig: PeerInfo,
  peerSmall: PeerInfo,
  size: AvatarSize,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

const seq = createSequence();

class DoublePeerAvatar extends PureComponent<Props, void> {
  id: string;
  ids: {
    big: string,
    clip: string,
    small: string
  };

  static defaultProps = {
    size: 'medium'
  };

  constructor(props: Props) {
    super(props);

    this.id = 'double_peer_avatar_' + seq.next();
    this.ids = {
      big: `${this.id}_big`,
      clip: `${this.id}_big_clip`,
      small: `${this.id}_small`
    };
  }

  getAvatarSize(): number {
    return getAvatarSize(this.props.size);
  }

  renderDefsBig() {
    if (this.props.peerBig.avatar) {
      return (
        <pattern id={this.ids.big} width="100%" height="100%" patternUnits="userSpaceOnUse">
          <image
            x="0"
            y="0"
            width="100px"
            height="100px"
            xlinkHref={this.props.peerBig.avatar}
          />
        </pattern>
      );
    }

    const colors: Gradient = getAvatarColor(this.props.peerBig.placeholder);

    return (
      <linearGradient
        id={this.ids.big}
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

  renderClipMaskBig() {
    return (
      <clipPath id={this.ids.clip}>
        <path
          // eslint-disable-next-line
          d="M58.2070074,99.3297063 C55.5367715,99.7706374 52.795171,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 C77.6142375,0 100,22.3857625 100,50 C100,52.795171 99.7706374,55.5367715 99.3297063,58.2070074 C94.8434182,55.5348957 89.6009561,54 84,54 C67.4314575,54 54,67.4314575 54,84 C54,89.6009561 55.5348957,94.8434182 58.2070074,99.3297063 Z"
        />
      </clipPath>
    );
  }

  renderDefsSmall() {
    if (this.props.peerSmall.avatar) {
      return (
        <pattern
          id={this.ids.small}
          width="100%"
          height="100%"
          x="58"
          y="58"
          patternUnits="userSpaceOnUse"
        >
          <image
            x="0"
            y="0"
            width="100px"
            height="100px"
            xlinkHref={this.props.peerSmall.avatar}
            transform="scale(0.507046569,0.507046569)"
          />
        </pattern>
      );
    }

    const colors: Gradient = getAvatarColor(this.props.peerSmall.placeholder);

    return (
      <linearGradient
        id={this.ids.small}
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

  renderSmallAvatar() {
    return (
      <circle cx="84" cy="84" r="25" fill={`url(#${this.ids.small})`} />
    );
  }

  renderBigAvatar() {
    return (
      <path
        // eslint-disable-next-line
        d="M58.2070074,99.3297063 C55.5367715,99.7706374 52.795171,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 C77.6142375,0 100,22.3857625 100,50 C100,52.795171 99.7706374,55.5367715 99.3297063,58.2070074 C94.8434182,55.5348957 89.6009561,54 84,54 C67.4314575,54 54,67.4314575 54,84 C54,89.6009561 55.5348957,94.8434182 58.2070074,99.3297063 Z"
        fill={`url(#${this.ids.big})`}
      />
    );
  }

  renderPeerSmallText() {
    if (this.props.peerSmall.avatar) {
      return null;
    }

    const size = this.getAvatarSize();
    const text = size >= 20 ? getAvatarText(this.props.peerSmall.title) : null;
    // const twoChars = Boolean(text && text.length !== 1);
    const textStyles = {
      fontSize: 20,
      fontWeight: 300
    };

    return (
      <text
        className={styles.text}
        x="84"
        y="84"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
        style={textStyles}
      >
        {text}
      </text>
    );
  }

  renderPeerBigText() {
    if (this.props.peerBig.avatar) {
      return null;
    }

    const size = this.getAvatarSize();
    const text = size >= 20 ? getAvatarText(this.props.peerBig.title) : null;
    // const twoChars = Boolean(text && text.length !== 1);
    const textStyles = {
      fontSize: 38,
      fontWeight: 300
    };

    return (
      <text
        className={styles.text}
        x="50"
        y="50"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
        style={textStyles}
        clipPath={`url(#${this.ids.clip})`}
      >
        {text}
      </text>
    );
  }

  render() {
    const className = classNames(styles.container, {
      [styles.clickable]: this.props.onClick
    }, this.props.className);
    const size = this.getAvatarSize();

    return (
      <div style={{ width: size, height: size }} className={className} onClick={this.props.onClick}>
        <svg viewBox="0 0 109 109" width={size} height={size} shapeRendering="auto">
          <defs>
            {this.renderDefsBig()}
            {this.renderClipMaskBig()}
            {this.renderDefsSmall()}
          </defs>
          {this.renderBigAvatar()}
          {this.renderSmallAvatar()}
          {this.renderPeerBigText()}
          {this.renderPeerSmallText()}
        </svg>
      </div>
    );
  }
}

export default DoublePeerAvatar;
