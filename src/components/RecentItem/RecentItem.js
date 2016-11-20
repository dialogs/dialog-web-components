/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import type { Peer, PeerInfo } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './RecentItem.css';
import PeerAvatar from '../PeerAvatar/PeerAvatar';

export type Props = {
  className?: string,
  info: PeerInfo,
  active: boolean,
  counter: number,
  text?: string,
  onSelect: (peer: Peer) => any
};

class RecentItem extends Component {
  props: Props;

  static defaultProps = {
    counter: 0,
    active: false
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
           nextProps.info !== this.props.info ||
           nextProps.active !== this.props.active ||
           nextProps.counter !== this.props.counter ||
           nextProps.text !== this.props.text;
  }

  handleClick = (): void => {
    const { info: { peer }, onSelect } = this.props;

    onSelect(peer);
  };

  renderAvatar() {
    const { info, text } = this.props;
    const avatarSize = text ? 'large' : 'medium';

    return (
      <PeerAvatar
        className={styles.avatar}
        size={avatarSize}
        peer={info}
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
    const { active, counter, text } = this.props;
    const className = classNames(styles.root, {
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
