/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import createSequence from '../../../utils/createSequence';
import getAvatarText from '../../Avatar/utils/getAvatarText';
import getAvatarColor from '../../Avatar/utils/getAvatarColor';
import styles from './SpaceAvatar.css';

export type Props = {
  id: string,
  title: string,
  size: number,
  placeholder: AvatarPlaceholder,
  image?: string,
  className?: string,
  active: boolean,
  onPick: (current: string) => mixed,
};

const seq = createSequence();

/**
 * Component for displaying already existed spaces.
 * When there is no selected image for space, initial letters from title
 * will be displayed.
 */
class SpaceAvatar extends PureComponent<Props> {
  svgId: string;

  static defaultProps = {
    placeholder: 'empty',
  };

  constructor(props: Props) {
    super(props);

    this.svgId = 'space_avatar_' + seq.next();
  }

  handleClick = (): void => {
    this.props.onPick(this.props.id);
  };

  svgShape() {
    const { active } = this.props;

    if (active) {
      // rhombus shape
      return (
        'M 20.5 20.5  A 0 0 0 0 1 20.5 20.5 ' +
        'L 37 4.5     A 21.5 21.5 0 0 1 63 4.5   L 79.5 20.5  A 0 0 0 0 1 79.5 20.5 ' +
        'L 95.5 37    A 21.5 21.5 0 0 1 95.5 63  L 79.5 79.5  A 0 0 0 0 1 79.5 79.5 ' +
        'L 63 95.5    A 21.5 21.5 0 0 1 37 95.5  L 20.5 79.5  A 0 0 0 0 1 20.5 79.5 ' +
        'L 4.5 63     A 21.5 21.5 0 0 1 4.5 37   L 20.5 20.5  Z'
      );
    }

    // square shape
    return (
      'M 50 15    A 0 0 0 0 1 50 15 ' +
      'L 67.5 15  A 17 17 0 0 1 85 32.5  L 85 50  A 0 0 0 0 1 85 50 ' +
      'L 85 67.5  A 17 17 0 0 1 67.5 85  L 50 85  A 0 0 0 0 1 50 85 ' +
      'L 32.5 85  A 17 17 0 0 1 15 67.5  L 15 50  A 0 0 0 0 1 15 50 ' +
      'L 15 32.5  A 17 17 0 0 1 32.5 15  L 50 15  Z'
    );
  }

  renderDefs() {
    const { image, placeholder } = this.props;

    if (image) {
      return (
        <pattern
          id={this.svgId}
          width="100%"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
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
        id={this.svgId}
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
    const { size, id, title, active } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.active]: active,
      [styles.nonactive]: !active,
    });

    return (
      <div
        id={`space_avatars_space_avatar_${id}`}
        className={className}
        title={title}
      >
        <svg
          className={styles.image}
          viewBox="0 0 100 100"
          width={size}
          height={size}
          shapeRendering="auto"
        >
          <defs>{this.renderDefs()}</defs>

          <g onClick={this.handleClick}>
            <path
              fill={`url(#${this.svgId})`}
              x="50%"
              y="50%"
              d={this.svgShape()}
            />
            {this.renderText()}
          </g>
        </svg>
      </div>
    );
  }
}

export default SpaceAvatar;
