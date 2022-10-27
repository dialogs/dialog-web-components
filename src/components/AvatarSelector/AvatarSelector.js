/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { selectFiles, fileToBase64 } from '@dlghq/dialog-utils';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import styles from './AvatarSelector.css';

export type Props = {
  className?: string,
  name: string,
  placeholder: string,
  avatar: ?string,
  onChange: (avatar: File) => void,
  onRemove?: () => void
};

export type State = {
  avatar: ?string
};

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

  renderRemoveIcon(): ?React.Element<any> {
    const { avatar } = this.state;

    if (avatar && this.props.onRemove) {
      return (
        <Icon
          className={styles.avatarRemoveIcon}
          glyph="clear"
          onClick={this.props.onRemove}
        />
      );
    }

    return null;
  }

  render(): React.Element<any> {
    const { name, placeholder } = this.props;
    const { avatar } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Avatar
          className={styles.avatar}
          size="big"
          title={name}
          image={avatar}
          placeholder={placeholder}
          onClick={this.handleAvatarChangerClick}
        />
        <Icon
          onClick={this.handleAvatarChangerClick}
          className={styles.avatarChangerIcon}
          glyph="photo_camera"
        />
        {this.renderRemoveIcon()}
      </div>
    );
  }
}

export default AvatarSelector;
