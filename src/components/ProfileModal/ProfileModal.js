/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalClose from '../ModalClose/ModalClose';
import ModalBody from '../ModalBody/ModalBody';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ProfileModal.css';
import type { Props, State } from './types';

class ProfileModal extends Component {
  props: Props;
  state: State;

  handleChange: Function;
  handleSubmit: Function;
  handleNickChooserClick: Function;
  handleAvatarChangerClick: Function;

  constructor(props: Props): void {
    super(props);

    this.state = {
      isWantNickname: Boolean(!props.profile.nick)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNickChooserClick = this.handleNickChooserClick.bind(this);
    this.handleAvatarChangerClick = this.handleAvatarChangerClick.bind(this);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.isWantNickname !== this.state.isWantNickname ||
           nextProps.className !== this.props.className ||
           nextProps.profile !== this.props.profile ||
           nextProps.isOpen !== this.props.isOpen;
  }

  handleChange(value: any, { target }: $FlowIssue): void {
    const { profile } = this.props;

    this.props.onChange({
      ...profile,
      [target.name]: value
    });
  }

  handleSubmit(): void {
    const { profile } = this.props;

    this.props.onSubmit(profile);
  }

  handleNickChooserClick(): void {
    this.setState({ isWantNickname: false });
  }

  handleAvatarChangerClick(): void {
    const { profile: { avatar } } = this.props;
    console.debug('handleAvatarChangerClick', { avatar });
  }

  renderAvatar(): React.Element<any> {
    const { profile: { name, nick, avatar, placeholder } } = this.props;

    return (
      <div className={styles.avatarChanger}>
        <PeerAvatar
          onClick={this.handleAvatarChangerClick}
          className={styles.avatar}
          peer={{
            title: name,
            userName: nick,
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
    const { isWantNickname } = this.state;
    const { profile: { nick } } = this.props;

    if (isWantNickname) {
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
        className={styles.nick}
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
    const { profile: { name, about } } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} isOpen onClose={this.handleSubmit}>
        <ModalHeader withBorder>
          <Text id="ProfileModal.title" />
          <ModalClose onClick={this.handleSubmit} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <div className={styles.avatarBlock}>
            {this.renderAvatar()}
          </div>
          <form autoComplete="off" className={styles.form}>
            <Input
              className={styles.input}
              id="name"
              large
              name="name"
              onChange={this.handleChange}
              placeholder="Your name"
              value={name}
            />
            {this.renderNick()}
            <Input
              className={styles.about}
              id="about"
              label="About - optional"
              large
              name="about"
              onChange={this.handleChange}
              placeholder="Describe Yourself"
              type="textarea"
              value={about}
            />
            {this.renderContacts()}
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ProfileModal;
