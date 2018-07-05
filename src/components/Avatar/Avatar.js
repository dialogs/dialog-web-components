/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarText from './utils/getAvatarText';
import getAvatarColor from './utils/getAvatarColor';
import createSequence from '../../utils/createSequence';
import styles from './Avatar.css';

export type Props = {
  title: string,
  size: number,
  placeholder: AvatarPlaceholder,
  image?: ?string,
  className?: string,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

const seq = createSequence();

/**
 * A component for displaying the user avatar.
 * If there is no image, it shows the initials from `title` on the gradient background
 */
class Avatar extends PureComponent<Props> {
  id: string;

  static defaultProps = {
    size: 32,
    placeholder: 'empty'
  };

  constructor(props: Props) {
    super(props);

    this.id = 'avatar_' + seq.next();
  }

  renderDefs() {
    const { image, placeholder } = this.props;

    if (image) {
      return (
        <pattern id={this.id} width="100%" height="100%" patternUnits="objectBoundingBox">
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlinkHref={image}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      );
    }

    const colors = getAvatarColor(placeholder);

    return (
      <linearGradient
        id={this.id}
        gradientUnits="userSpaceOnUse"
        x1="100%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        <stop offset="0%" stopColor={colors.payload.from} />
        <stop offset="100%" stopColor={colors.payload.to} />
      </linearGradient>
    );
  }

  renderText() {
    const { title, size, image } = this.props;

    if (image) {
      return null;
    }

    const text = size >= 20 ? getAvatarText(title) : null;

    return (
      <text
        className={styles.text}
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
      >
        {text}
      </text>
    );
  }

  render() {
    const { size } = this.props;
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.onClick ? styles.clickable : null
    );

    return (
      <div
        style={{ width: size, height: size }}
        className={className}
        onClick={this.props.onClick}
        title={this.props.title}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} shapeRendering="auto">
          <defs>
            {this.renderDefs()}
          </defs>
          <rect
            fill={`url(#${this.id})`} x="0" y="0" width="100"
            height="100"
          />
          {this.renderText()}
        </svg>
      </div>
    );
  }
}

export default Avatar;
