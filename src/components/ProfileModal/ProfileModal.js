/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import styles from './ProfileModal.css';
import type { Props, State } from './types';

class ProfileModal extends PureComponent {
  props: Props;
  state: State;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props): void {
    super(props);

    this.state = {
      name: props.profile.name,
      nick: props.profile.nick,
      about: props.profile.about,
      avatar: props.profile.avatar
    };
  }

  handleChange = (value: string, event: SyntheticInputEvent): void => {
    this.setState({
      [event.target.name]: value
    });
  };

  handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    if (this.state.name !== this.props.profile.name) {
      this.props.onNameChange(this.state.name);
    }

    if (this.state.nick && this.state.nick !== this.props.profile.nick) {
      this.props.onNickChange(this.state.nick);
    }

    if (this.state.about && this.state.about !== this.props.profile.about) {
      this.props.onAboutChange(this.state.about);
    }
  };

  handleNickChooserClick = (): void => {
    this.setState({ nick: '' });
  };

  handleAvatarChange = (avatar: File): void => {
    this.props.onAvatarChange(avatar);
  };

  isChanged(): boolean {
    return this.state.name !== this.props.profile.name ||
           this.state.nick !== this.props.profile.nick ||
           this.state.about !== this.props.profile.about;
  }

  renderAvatar(): React.Element<any> {
    const { profile: { name, placeholder, avatar } } = this.props;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={name}
          placeholder={placeholder}
          avatar={avatar}
          onChange={this.handleAvatarChange}
          onRemove={this.props.onAvatarRemove}
        />
      </div>
    );
  }

  renderNick(): React.Element<any> {
    const { nick } = this.state;
    const { l10n: { formatText } } = this.context;

    if (nick === null) {
      return (
        <div className={styles.nick}>
          <Button
            view="link"
            theme="primary"
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
        label={formatText('ProfileModal.nickname')}
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
        <Text className={styles.contactTitle} id="ProfileModal.phone" tagName="div" />
        <div className={styles.contactContent}>
          {phone.number}
          <Icon glyph="lock" className={styles.contactContentIcon} />
        </div>
      </div>
    ));
    const emailsBlock = emails.map((email) => (
      <div key={email.email}>
        <Text className={styles.contactTitle} id="ProfileModal.email" tagName="div" />
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
    const { l10n: { formatText } } = this.context;

    return (
      <Modal className={className} isOpen onClose={this.props.onClose}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <ModalHeader withBorder>
            <Text id="ProfileModal.title" />
            <ModalClose onClick={this.props.onClose} />
          </ModalHeader>

          <ModalBody className={styles.body}>
            {this.renderAvatar()}
            <div className={styles.form}>
              <Input
                className={styles.input}
                large
                id="name"
                name="name"
                label={formatText('ProfileModal.name')}
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
                label={formatText('ProfileModal.about')}
                placeholder={formatText('ProfileModal.about_placeholder')}
                value={about || ''}
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
