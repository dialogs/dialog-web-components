/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './CallAvatar.css';

type Props = {
  className?: string,
  peer: PeerInfo,
  size: number,
  animated: boolean,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

class CallAvatar extends PureComponent<Props> {
  isSmall(): boolean {
    return this.props.size <= 50;
  }

  getAnimationRingSize = (position: number): number => {
    const { size } = this.props;
    const isSmall = this.isSmall();
    const indent = isSmall ? 6 : 12;
    const mod = isSmall ? 10 : 20;

    return size + indent + mod * position;
  };

  renderRings() {
    const ringsCount = this.isSmall() ? 2 : 3;
    const rings = [];
    for (let i = 0; i < ringsCount; i++) {
      const size = this.getAnimationRingSize(i);
      const style = {
        width: size,
        height: size,
        marginLeft: 0 - size / 2,
        marginTop: 0 - size / 2,
        animationDelay: `${125 * i}ms`,
      };

      rings.push(<div style={style} key={`ring_${i}`} />);
    }

    return rings;
  }

  renderAnimation() {
    const { animated, size } = this.props;
    const className = classNames(styles.animation, {
      [styles.animationEnded]: !animated,
    });
    const style = {
      width: size,
      height: size,
    };

    return (
      <div className={className} style={style}>
        {this.renderRings()}
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          className={styles.avatar}
          peer={this.props.peer}
          size={this.props.size}
          onClick={this.props.onClick}
        />
        {this.renderAnimation()}
      </div>
    );
  }
}

export default CallAvatar;
