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
  onChange: (avatar: string) => void,
  onRemove?: () => void
};

class AvatarSelector extends PureComponent {
  props: Props;

  componentWillReceiveProps(nextProps: Props): void {
    this.setState({ avatar: nextProps.avatar });
  }

  handleAvatarChangerClick = (): void => {
    selectFiles((files) => {
      fileToBase64(files[0], (avatar) => {
        this.props.onChange(avatar);
      });
    }, false);
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
    const { name, placeholder, avatar } = this.props;
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
