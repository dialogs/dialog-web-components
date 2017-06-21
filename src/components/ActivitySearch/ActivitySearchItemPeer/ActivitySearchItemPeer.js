/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo, Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import PeerAvatar from '../../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivitySearchItemPeer.css';

type Props = {
  info: PeerInfo,
  onGoToPeer: (peer: Peer) => mixed
};

class ActivitySearchItemMessage extends PureComponent {
  props: Props;

  handleGoToPeer = (event: SyntheticMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onGoToPeer(this.props.info.peer);
  };

  render() {
    const { info } = this.props;

    return (
      <div className={styles.peer} onClick={this.handleGoToPeer}>
        <PeerAvatar
          className={styles.avatar}
          peer={info}
          size={30}
        />
        <PeerInfoTitle
          className={styles.title}
          title={info.title}
        />
      </div>
    );
  }
}

export default ActivitySearchItemMessage;
