/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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
  value: boolean,
  onFavouriteChange: (value: boolean) => void
};

class ToolbarAvatar extends PureComponent {
  props: Props;

  handleFavouriteToggle = (): void => {
    this.props.onFavouriteChange(!this.props.value);
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
          value={this.props.value}
          onClick={this.handleFavouriteToggle}
          className={styles.favourite}
        />
      </div>
    );
  }
}

export default ToolbarAvatar;
