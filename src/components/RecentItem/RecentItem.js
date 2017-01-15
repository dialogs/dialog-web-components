/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { Peer, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './RecentItem.css';
import PeerAvatar from '../PeerAvatar/PeerAvatar';

export type Props = {
  className?: string,
  info: PeerInfo,
  active: boolean,
  counter: number,
  text?: string,
  online?: ?boolean,
  onSelect: (peer: Peer) => any
};

class RecentItem extends PureComponent {
  props: Props;

  static defaultProps = {
    counter: 0,
    active: false
  };

  handleClick = (): void => {
    const { info: { peer }, onSelect } = this.props;

    onSelect(peer);
  };

  renderAvatar() {
    const { info, text, online } = this.props;
    const avatarSize = text ? 'large' : 'medium';

    return (
      <PeerAvatar
        className={styles.avatar}
        size={avatarSize}
        peer={info}
        online={online}
      />
    );
  }

  renderText() {
    const { info, text } = this.props;

    if (text) {
      return (
        <div className={styles.text}>
          <div className={styles.title}>{info.title}</div>
          <div className={styles.message}>{text}</div>
        </div>
      );
    }

    return (
      <div className={styles.text}>
        <div className={styles.title}>{info.title}</div>
      </div>
    );
  }

  renderCounter() {
    const { counter } = this.props;

    if (counter === 0) {
      return null;
    }

    return (
      <div className={styles.counter}>
        {counter}
      </div>
    );
  }

  render() {
    console.debug(this.props);
    const { active, counter, text } = this.props;
    const className = classNames(styles.container, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
      [styles.large]: text
    }, this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        {this.renderAvatar()}
        {this.renderText()}
        {this.renderCounter()}
      </div>
    );
  }
}

export default RecentItem;
