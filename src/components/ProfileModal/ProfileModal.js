/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import selectFiles from '../../utils/selectFiles';
import fileToBase64 from '../../utils/fileToBase64';
import Modal from '../Modal/Modal';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalClose from '../ModalClose/ModalClose';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ProfileModal.css';
import type { Props, State } from './types';

class ProfileModal extends PureComponent {
  props: Props;
  state: State;

  handleChange: Function;
  handleSubmit: Function;
  handleNickChooserClick: Function;
  handleAvatarChangerClick: Function;
  handleAvatarChange: (avatar: File[]) => void;

  constructor(props: Props): void {
    super(props);

    this.state = {
      name: props.profile.name,
      nick: props.profile.nick,
      about: props.profile.about,
      avatar: props.profile.avatar
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNickChooserClick = this.handleNickChooserClick.bind(this);
    this.handleAvatarChangerClick = this.handleAvatarChangerClick.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }

  handleChange(value: any, { target }: $FlowIssue): void {
    console.debug('handleChange', target.name, value);
    this.setState({
      [target.name]: value
    });
  }

  handleSubmit() {
    if (this.state.name !== this.props.profile.name) {
      this.props.onNameChange(this.state.name);
    }

    if (this.state.nick && this.state.nick !== this.props.profile.nick) {
      this.props.onNickChange(this.state.nick);
    }

    if (this.state.about && this.state.about !== this.props.profile.about) {
      this.props.onAboutChange(this.state.about);
    }
  }

  handleNickChooserClick(): void {
    this.setState({ nick: '' });
  }

  handleAvatarChangerClick(): void {
    selectFiles(this.handleAvatarChange, false);
  }

  handleAvatarChange(files: File[]): void {
    fileToBase64(files[0], (avatar) => this.setState({ avatar }));
    this.props.onAvatarChange(files[0]);
  }

  isChanged(): boolean {
    return this.state.name !== this.props.profile.name ||
           this.state.nick !== this.props.profile.nick ||
           this.state.about !== this.props.profile.about;
  }

  renderAvatar(): React.Element<any> {
    const { profile: { name, placeholder } } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarChanger}>
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
          glyph="photo_camera"
          className={styles.avatarChangerIcon}
          onClick={this.handleAvatarChangerClick}
        />
      </div>
    );
  }

  renderNick(): React.Element<any> {
    const { nick } = this.state;

    if (nick === null) {
      return (
        <div className={styles.nick}>
          <Button
            view="link"
            className={styles.nickButton}
            onClick={this.handleNickChooserClick}
          >
            <Icon glyph="add_circle_outline" className={styles.nickButtonIcon} />
            <Text id="ProfileModal.choose_nickname" />
          </Button>
          <Text
            className={styles.nickHint}
            id="ProfileModal.choose_nickname_hint"
            tagName="div"
          />
        </div>
      );
    }

    return (
      <Input
        className={styles.nickInput}
        id="nick"
        name="nick"
        large
        prefix="@"
        onChange={this.handleChange}
        value={nick}
      />
    );
  }

  renderContacts(): ?React.Element<any> {
    const { profile: { phones, emails } } = this.props;

    if (!phones.length && !emails.length) {
      return null;
    }

    const phonesBlock = phones.map((phone) => (
      <div key={phone.number}>
        <div className={styles.contactTitle}>{phone.title}</div>
        <div className={styles.contactContent}>
          {phone.number}
          <Icon glyph="lock" className={styles.contactContentIcon} />
        </div>
      </div>
    ));
    const emailsBlock = emails.map((email) => (
      <div key={email.email}>
        <div className={styles.contactTitle}>{email.title}</div>
        <div className={styles.contactContent}>
          {email.email}
          <Icon glyph="lock" className={styles.contactContentIcon} />
        </div>
      </div>
    ));

    return (
      <div className={styles.contacts}>
        {phonesBlock}
        {emailsBlock}
      </div>
    );
  }

  render(): React.Element<any> {
    const { name, about } = this.state;
    const className = classNames(styles.container, this.props.className);
    console.debug(this.props, this.state);

    return (
      <Modal className={className} isOpen onClose={this.props.onClose}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <ModalHeader withBorder>
            <Text id="ProfileModal.title" />
            <ModalClose onClick={this.props.onClose} />
          </ModalHeader>

          <ModalBody className={styles.body}>
            <div className={styles.avatarBlock}>
              {this.renderAvatar()}
            </div>
            <div className={styles.form}>
              <Input
                className={styles.input}
                large
                id="name"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={this.handleChange}
              />
              {this.renderNick()}
              <Input
                className={styles.about}
                large
                id="about"
                name="about"
                type="textarea"
                label="About - optional"
                placeholder="Describe Yourself"
                value={about}
                onChange={this.handleChange}
              />
              {this.renderContacts()}
            </div>
          </ModalBody>

          <ModalFooter className={styles.footer}>
            <Button
              wide
              type="submit"
              theme="success"
              rounded={false}
              disabled={!this.isChanged()}
            >
              <Text id="ProfileModal.save" />
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default ProfileModal;
