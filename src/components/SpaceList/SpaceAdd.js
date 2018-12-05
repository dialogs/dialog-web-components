/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from './SpaceList.css';

export type Props = {
  size: number,
  className?: string,
  onClick: () => mixed,
};

class SpaceAvatar extends PureComponent<Props> {
  svgShape = () => {
    return (
      'M 50 15    A 0 0 0 0 1 50 15 ' +
      'L 67.5 15  A 17 17 0 0 1 85 32.5  L 85 50  A 0 0 0 0 1 85 50 ' +
      'L 85 67.5  A 17 17 0 0 1 67.5 85  L 50 85  A 0 0 0 0 1 50 85 ' +
      'L 32.5 85  A 17 17 0 0 1 15 67.5  L 15 50  A 0 0 0 0 1 15 50 ' +
      'L 15 32.5  A 17 17 0 0 1 32.5 15  L 50 15  Z'
    );
  };

  render() {
    const { size } = this.props;
    const className = classNames(styles.spaceAdd, this.props.className);

    return (
      <div
        className={className}
        style={{ minWidth: size, width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" shapeRendering="auto">
          <g onClick={this.props.onClick}>
            <path d={this.svgShape()} />
            <rect width="4" height="30" x="48" y="35" rx="2" />
            <rect height="4" width="30" y="48" x="35" ry="2" />
          </g>
        </svg>
      </div>
    );
  }
}

export default SpaceAvatar;
