/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import selectFiles from '../../utils/selectFiles';
import fileToBase64 from '../../utils/fileToBase64';
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


class AvatarSelector extends Component {
  props: Props;
  state: State;

  handleAvatarChange: (files: File[]) => void;
  handleAvatarChangerClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      avatar: props.avatar
    };

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarChangerClick = this.handleAvatarChangerClick.bind(this);
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.setState({ avatar: nextProps.avatar });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.avatar !== this.state.avatar ||
           nextProps.avatar !== this.props.avatar ||
           nextProps.name !== this.props.name ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.className !== this.props.className;
  }

  handleAvatarChange(files: File[]): void {
    fileToBase64(files[0], (avatar) => this.setState({ avatar }));
    this.props.onChange(files[0]);
  }

  handleAvatarChangerClick(): void {
    selectFiles(this.handleAvatarChange, false);
  }

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
