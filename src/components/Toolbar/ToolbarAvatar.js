/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import ToolbarFavouriteButton from '../ToolbarFavouriteButton/ToolbarFavouriteButton';
import styles from './Toolbar.css';
import type { PeerInfo } from '@dlghq/dialog-types';

export type Props = {
  className?: string,
  peerInfo: PeerInfo,
  isFavourite: boolean,
  onFavouriteChange: (isFavourite: boolean) => void
};

class ToolbarAvatar extends PureComponent {
  props: Props;

  handleFavouriteToggle = (): void => {
    this.props.onFavouriteChange(!this.props.isFavourite);
  };

  render(): React.Element<any> {
    const className = classNames(styles.avatar, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          peer={this.props.peerInfo}
          size={40}
        />
        <ToolbarFavouriteButton
          value={this.props.isFavourite}
          onClick={this.handleFavouriteToggle}
          className={styles.favourite}
        />
      </div>
    );
  }
}

export default ToolbarAvatar;
