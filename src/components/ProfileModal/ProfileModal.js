/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { JSONValue } from '@dlghq/dialog-utils';
import type { Props, State } from './types';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import { safelyParseJSON, safelyParseJSONSchema } from '@dlghq/dialog-utils';
import { isEqual } from 'lodash';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Input from '../InputNext/InputNext';
import Field from '../Field/Field';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import ImageEdit from '../ImageEdit/ImageEdit';
import Spinner from '../Spinner/Spinner';
import CustomForm from '../CustomForm/CustomForm';
import styles from './ProfileModal.css';
import HotKeys from '../HotKeys/HotKeys';

class ProfileModal extends PureComponent<Props, State> {
  nameInput: ?HTMLInputElement;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  constructor(props: Props): void {
    super(props);

    const { profile } = props;

    this.state = {
      screen: 'profile',
      profile: profile
        ? {
            name: profile.name,
            nick: profile.nick,
            about: profile.about,
            avatar: profile.bigAvatar,
            customProfile: profile.customProfile
              ? safelyParseJSON(profile.customProfile)
              : null,
          }
        : {
            name: '',
            nick: null,
            about: null,
            avatar: null,
            customProfile: null,
          },
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.setState(
        {
          profile: {
            name: profile.name,
            nick: profile.nick,
            about: profile.about,
            avatar: profile.bigAvatar,
            customProfile: profile.customProfile
              ? safelyParseJSON(profile.customProfile)
              : null,
          },
        },
        () => {
          if (this.nameInput) {
            this.nameInput.focus();
          }
        },
      );
    }
  }

  handleChange = (value: string, { target }: SyntheticInputEvent<>) => {
    this.setState(({ profile }) => {
      return {
        profile: {
          ...profile,
          [target.name]: value,
        },
      };
    });
  };

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit({
      name: this.state.profile.name,
      nick: this.state.profile.nick,
      about: this.state.profile.about,
      avatar: this.state.profile.avatar,
      customProfile: JSON.stringify(this.state.profile.customProfile),
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.setState(({ profile }) => {
      return {
        screen: 'avatar',
        profile: {
          ...profile,
          avatar,
        },
      };
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.setState(({ profile }) => {
      return {
        screen: 'profile',
        profile: {
          ...profile,
          avatar,
        },
      };
    });
  };

  handleGoToProfile = (): void => {
    const { profile } = this.props;
    if (profile) {
      this.setState((prevState) => {
        return {
          screen: 'profile',
          profile: {
            ...prevState.profile,
            avatar: profile.avatar,
          },
        };
      });
    }
  };

  handleAvatarRemove = (): void => {
    this.setState(({ profile }) => {
      return {
        screen: 'profile',
        profile: {
          ...profile,
          avatar: null,
        },
      };
    });
  };

  handleCustomProfileChange = (customProfile: JSONValue): void => {
    this.setState(({ profile }) => {
      return {
        profile: {
          ...profile,
          customProfile: JSON.parse(JSON.stringify(customProfile)),
        },
      };
    });
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (this.isChanged()) {
        this.handleSubmit();
      }
    }
  };

  isPending(): boolean {
    const {
      context: { name, nick, about, avatar },
    } = this.props;

    return name.pending || nick.pending || about.pending || avatar.pending;
  }

  isCustomProfileChanged(): boolean {
    if (this.props.profile) {
      const profileFromState = this.state.profile.customProfile;
      const profileFromProps = this.props.profile.customProfile
        ? safelyParseJSON(this.props.profile.customProfile)
        : null;

      return !isEqual(profileFromState, profileFromProps);
    }

    return false;
  }

  isChanged(): boolean {
    if (!this.props.profile) {
      return false;
    }

    return (
      this.state.profile.name !== this.props.profile.name ||
      (this.state.profile.nick !== this.props.profile.nick &&
        this.state.profile.nick !== '') ||
      this.state.profile.about !== this.props.profile.about ||
      this.state.profile.avatar !== this.props.profile.bigAvatar ||
      this.isCustomProfileChanged()
    );
  }

  getInputState = (field: string): Object => {
    if (this.props.context[field].error) {
      return {
        status: 'error',
        hint: this.props.context[field].error,
      };
    }

    return {};
  };

  setNameInput = (input: ?HTMLInputElement): void => {
    this.nameInput = input;
  };

  renderHeader() {
    switch (this.state.screen) {
      case 'profile':
        return (
          <ModalHeader withBorder>
            <Text id="ProfileModal.title" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="profile_modal_close_button"
            />
          </ModalHeader>
        );
      case 'avatar':
        return (
          <ModalHeader withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleGoToProfile}
              className={styles.back}
              id="profile_modal_back_button"
              size={28}
            />
            <Text id="ProfileModal.title_avatar" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="profile_modal_close_button"
            />
          </ModalHeader>
        );
      default:
        return null;
    }
  }

  renderAvatar() {
    const { profile } = this.props;
    if (!profile) {
      return null;
    }

    const {
      profile: { name, avatar },
    } = this.state;
    const handlers = this.state.profile.avatar
      ? { onRemove: this.handleAvatarRemove }
      : {};

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={name}
          size={140}
          avatar={avatar}
          placeholder={profile.placeholder}
          onChange={this.handleAvatarEdit}
          {...handlers}
        />
      </div>
    );
  }

  renderMainForm() {
    const { profile } = this.state;

    if (!profile) {
      return null;
    }

    const {
      l10n: { formatText },
    } = this.context;

    return (
      <Field className={styles.field}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <Input
            ref={this.setNameInput}
            className={styles.name}
            id="profile_modal_name"
            name="name"
            label={formatText('ProfileModal.name')}
            value={profile.name}
            {...this.getInputState('name')}
            onChange={this.handleChange}
          />
          <Input
            className={styles.nick}
            id="profile_modal_nick"
            name="nick"
            label="ProfileModal.nickname"
            prefix="@"
            hint="ProfileModal.nickname_hint"
            onChange={this.handleChange}
            value={profile.nick || ''}
            {...this.getInputState('nick')}
          />
          <Input
            className={styles.about}
            id="profile_modal_about"
            name="about"
            type="textarea"
            label="ProfileModal.about"
            placeholder={formatText('ProfileModal.about_placeholder')}
            value={profile.about || ''}
            {...this.getInputState('about')}
            onChange={this.handleChange}
          />
        </form>
      </Field>
    );
  }

  renderContacts() {
    const { profile } = this.props;

    if (!profile) {
      return null;
    }

    if (!profile.phones.length && !profile.emails.length) {
      return null;
    }

    const phones = profile.phones.map((phone) => (
      <div key={phone.number} className={styles.contactLinkWrapper}>
        <a href={`tel:${phone.number}`} className={styles.contactLink}>
          {phone.number}
        </a>
      </div>
    ));

    const emails = profile.emails.map((email) => (
      <div key={email.email} className={styles.contactLinkWrapper}>
        <a href={`mailto:${email.email}`} className={styles.contactLink}>
          {email.email}
        </a>
      </div>
    ));

    return (
      <Field className={styles.field}>
        {phones.length ? (
          <div className={styles.contactContent}>
            <Text
              className={styles.contactTitle}
              id="ProfileModal.phone"
              tagName="div"
            />
            {phones}
          </div>
        ) : null}
        {emails.length ? (
          <div className={styles.contactContent}>
            <Text
              className={styles.contactTitle}
              id="ProfileModal.email"
              tagName="div"
            />
            {emails}
          </div>
        ) : null}
      </Field>
    );
  }

  renderCustomForm() {
    const { schema, profile } = this.props;
    const {
      profile: { customProfile },
    } = this.state;

    if (!profile || !schema) {
      return null;
    }

    const customProfileSchema = safelyParseJSONSchema(schema);

    if (!customProfileSchema) {
      return null;
    }

    return (
      <Field className={styles.field}>
        <CustomForm
          id="custom_profile"
          name="custom_profile"
          schema={customProfileSchema}
          value={customProfile}
          onSubmit={this.handleSubmit}
          onChange={this.handleCustomProfileChange}
        />
      </Field>
    );
  }

  renderProfile() {
    const { profile } = this.props;

    if (!profile) {
      return (
        <div className={styles.pendingWrapper}>
          <Spinner size="large" />
        </div>
      );
    }

    return (
      <ModalBody className={styles.body}>
        {this.renderAvatar()}
        <div className={styles.form}>
          {this.renderMainForm()}
          {this.renderContacts()}
          {this.renderCustomForm()}
        </div>
      </ModalBody>
    );
  }

  renderAvatarEdit() {
    const {
      profile: { avatar },
    } = this.state;

    if (avatar && typeof avatar !== 'string') {
      return (
        <div>
          <ImageEdit
            size={250}
            height={400}
            image={avatar}
            type="circle"
            onSubmit={this.handleAvatarChange}
          />
        </div>
      );
    }

    return null;
  }

  renderFooter() {
    if (this.state.screen === 'profile') {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            type="submit"
            theme="success"
            id="profile_modal_submit_button"
            rounded={false}
            loading={this.isPending()}
            disabled={!this.isChanged() || this.isPending()}
            onClick={this.handleSubmit}
          >
            <Text id="ProfileModal.save" />
          </Button>
        </ModalFooter>
      );
    }

    return null;
  }

  renderBody() {
    switch (this.state.screen) {
      case 'profile':
        return this.renderProfile();
      case 'avatar':
        return this.renderAvatarEdit();
      default:
        return null;
    }
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} isOpen onClose={this.props.onClose}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </Modal>
      </HotKeys>
    );
  }
}

export default ProfileModal;
