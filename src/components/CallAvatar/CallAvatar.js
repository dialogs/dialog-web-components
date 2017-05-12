/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './CallAvatar.css';

export type Props = {
  className?: string,
  size: number,
  animated: boolean,
  caller: User
};

class CallAvatar extends PureComponent {
  props: Props;

  isAvatarSmall = (): boolean => {
    return Boolean(this.props.size <= 50);
  };

  getAnimationRingSize = (position: number): number => {
    const { size } = this.props;
    const isSmall = this.isAvatarSmall();
    const indent = isSmall ? 6 : 12;
    const mod = isSmall ? 10 : 20;

    return size + indent + (mod * position);
  };

  renderRings() {
    const ringsCount = this.isAvatarSmall() ? 2 : 3;
    const rings = [];
    for (let i = 0; i < ringsCount; i++) {
      const size = this.getAnimationRingSize(i);
      const style = {
        width: size,
        height: size,
        marginLeft: 0 - (size / 2),
        marginTop: 0 - (size / 2),
        animationDelay: `${125 * i}ms`
      };

      rings.push(
        <div
          style={style}
          key={`ring_${i}`}
        />
      );
    }

    return rings;
  }

  renderAnimation() {
    const { animated, size } = this.props;
    const className = classNames(styles.animation, {
      [styles.animationEnded]: !animated
    });
    const style = {
      width: size,
      height: size
    };

    return (
      <div className={className} style={style}>
        {this.renderRings()}
      </div>
    );
  }

  render() {
    const { caller: { avatar, name, placeholder }, size } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Avatar
          className={styles.avatar}
          size={size}
          image={avatar}
          title={name}
          placeholder={placeholder}
        />
        {this.renderAnimation()}
      </div>
    );
  }
}

export default CallAvatar;
