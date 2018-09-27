/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import Switcher from '../Switcher/Switcher';
import styles from './CreateNewModal.css';

export type Props = {
  id: string,
  type: 'group' | 'channel',
  title: string,
  shortname: ?string,
  shortnamePrefix: ?string,
  about: ?string,
  avatar: ?File,
  className?: string,
  vertical: boolean,
  isPublicGroupsEnabled: boolean,
  onSubmit: (event: SyntheticEvent<>) => void,
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
  onAvatarRemove: () => void,
  onAvatarChange: (avatar: File) => void
};
export type State = {
  avatar: ?string,
  isPublic: boolean
};

export type Context = ProviderContext;

class CreateGroupInfoForm extends PureComponent<Props, State> {
  shortnameInput: ?InputNext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  static defaultProps = {
    vertical: false
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      avatar: null,
      isPublic: Boolean(props.shortname)
    };
  }

  componentDidMount() {
    if (this.props.avatar) {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.avatar) {
      fileToBase64(nextProps.avatar, (avatar) => this.setState({ avatar }));
    } else {
      this.setState({ avatar: nextProps.avatar });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.shortnameInput) {
      if (prevState.isPublic !== this.state.isPublic && this.state.isPublic) {
        this.shortnameInput.focus();
      }
    }
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  handlePublicToggle = (isPublic: boolean): void => {
    this.setState({ isPublic });
  };

  setShortnameInput = (shortnameInput: ?InputNext): void => {
    if (shortnameInput) {
      this.shortnameInput = shortnameInput;
    }
  };

  renderAvatar() {
    const { title } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={title}
          placeholder="empty"
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname() {
    const { type, shortname, id, isPublicGroupsEnabled } = this.props;

    if (!isPublicGroupsEnabled) {
      return null;
    }

    return (
      <div className={styles.shortnameWrapper}>
        <Switcher
          id={`${id}_public_swither`}
          name={`${id}_public_swither`}
          value={this.state.isPublic}
          onChange={this.handlePublicToggle}
          label={`CreateNewModal.${type}.public`}
          className={styles.switcher}
        />
        <InputNext
          id={`${id}_shortname`}
          name="shortname"
          value={shortname || ''}
          prefix={this.props.shortnamePrefix}
          disabled={!this.state.isPublic}
          label={`CreateNewModal.${type}.info.shortname`}
          ref={this.setShortnameInput}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  render() {
    const { id, type, about, title, vertical } = this.props;
    const { l10n } = this.context;
    const className = classNames(
      styles.info,
      {
        [styles.vertical]: vertical
      },
      this.props.className
    );

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form id={id} autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
          <InputNext
            className={styles.input}
            id={`${id}_title`}
            name="title"
            onChange={this.props.onChange}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.title.placeholder`)}
            label={l10n.formatText(`CreateNewModal.${type}.info.title.label`)}
            value={title}
            htmlAutoFocus
          />
          <InputNext
            className={styles.input}
            id={`${id}_about`}
            name="about"
            onChange={this.props.onChange}
            label={l10n.formatText(`CreateNewModal.${type}.info.description.label`)}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.description.placeholder`)}
            type="textarea"
            value={about || ''}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default CreateGroupInfoForm;
