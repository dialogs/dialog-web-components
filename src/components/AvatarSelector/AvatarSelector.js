/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { selectFiles, fileToBase64 } from '@dlghq/dialog-utils';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import styles from './AvatarSelector.css';

export type Props = {
  className?: string,
  name: string,
  placeholder: AvatarPlaceholder,
  avatar: ?(string | File),
  onChange: (avatar: File) => void,
  onRemove?: () => void
};

type State = {
  avatar: ?string
};

class AvatarSelector extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    if (!props.avatar || typeof props.avatar === 'string') {
      this.state = {
        avatar: props.avatar
      };
    } else {
      this.state = {
        avatar: null
      };
      fileToBase64(props.avatar, (avatar) => {
        this.setState({ avatar });
      });
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (!nextProps.avatar || typeof nextProps.avatar === 'string') {
      this.setState({ avatar: nextProps.avatar });
    } else {
      fileToBase64(nextProps.avatar, (avatar) => {
        this.setState({ avatar });
      });
    }
  }

  handleAvatarChangerClick = (): void => {
    selectFiles((files) => {
      if (files.length) {
        this.props.onChange(files[0]);
      }
    }, false, 'image/*');
  };

  renderRemoveIcon(): ?React.Element<any> {
    const { avatar } = this.props;

    if (avatar && this.props.onRemove) {
      return (
        <div className={styles.avatarRemove} onClick={this.props.onRemove}>
          <Icon glyph="close" className={styles.avatarRemoveIcon} size={18} />
        </div>
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
        <div onClick={this.handleAvatarChangerClick} className={styles.avatarChanger}>
          <Icon glyph="photo_camera" className={styles.avatarChangerIcon} size={22} />
        </div>
        {this.renderRemoveIcon()}
      </div>
    );
  }
}

export default AvatarSelector;
