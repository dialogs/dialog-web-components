/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import SpaceAvatar from './SpaceAvatar/SpaceAvatar.js';
import SpaceAdd from './SpaceAdd';
import styles from './SpaceList.css';

export type Props = {
  className?: string,
  current: string,
  width?: number,
  size: number,
  variants: Array<{
    id: string,
    title: string,
    image?: string,
    placeholder?: AvatarPlaceholder,
    className?: string,
  }>,
  onPick: (current: string) => mixed,
  onClick: () => mixed,
};

class SpaceList extends PureComponent<Props> {
  static defaultProps = {
    size: 40,
    width: 240,
  };

  render() {
    const { current, variants, size, width } = this.props;
    const className = classNames(styles.container, this.props.className);

    /**
     * in pixels
     * at this moment I don't know,
     * how this will be displayed with custom scrollbar.
     * will fix later
     */
    const DEFAULT_GAP_UNDER_SPACE_ROW = 20;

    const spaceAvatars = variants.map((variant) => {
      const { id, title, image, placeholder } = variant;
      const active = id === current;

      return (
        <SpaceAvatar
          id={id}
          key={id}
          title={title}
          active={active}
          image={image}
          placeholder={placeholder}
          size={size}
          onPick={this.props.onPick}
        />
      );
    });

    return (
      <div
        className={className}
        style={{
          maxHeight: size + DEFAULT_GAP_UNDER_SPACE_ROW,
          height: size + DEFAULT_GAP_UNDER_SPACE_ROW,
          width,
        }}
      >
        <div className={styles.wrapper}>{spaceAvatars}</div>

        <SpaceAdd size={size} onClick={this.props.onClick} />
      </div>
    );
  }
}

export default SpaceList;
