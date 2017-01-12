/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { selectFiles, fileToBase64 } from '@dlghq/dialog-utils';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Icon from '../Icon/Icon';
import styles from './AvatarSelector.css';

export type Props = {
  className?: string,
  name: string,
  placeholder: string,
  avatar: ?string,
  onChange: (avatar: File) => void
};

export type State = {
  avatar: ?string
}


class AvatarSelector extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      avatar: props.avatar
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.setState({ avatar: nextProps.avatar });
  }

  handleAvatarChange = (files: File[]): void => {
    fileToBase64(files[0], (avatar) => this.setState({ avatar }));
    this.props.onChange(files[0]);
  };

  handleAvatarChangerClick = (): void => {
    selectFiles(this.handleAvatarChange, false);
  };

  render(): React.Element<any> {
    const { name, placeholder } = this.props;
    const { avatar } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          onClick={this.handleAvatarChangerClick}
          className={styles.avatar}
          peer={{
            title: name,
            avatar,
            placeholder
          }}
          size="big"
        />
        <Icon
          onClick={this.handleAvatarChangerClick}
          className={styles.avatarChangerIcon}
          glyph="photo_camera"
        />
      </div>
    );
  }
}

export default AvatarSelector;
