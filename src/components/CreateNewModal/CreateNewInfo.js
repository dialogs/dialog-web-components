/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import Input from '../Input/Input';
import styles from './CreateNewModal.css';

export type Props = {
  type: 'group' | 'channel',
  title: string,
  shortname: ?string,
  about: ?string,
  avatar: ?File,
  onChange: () => void;
  onAvatarChange: (avatar: File) => void;
}
export type State = {
  avatar: ?string
}

export type Context = ProviderContext;

class CreateNewType extends PureComponent {
  props: Props;
  state: State;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      avatar: null
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
    }
  }

  renderAvatar(): React.Element<any> {
    const { title } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={title}
          placeholder="empty"
          avatar={avatar}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname(): ?React.Element<any> {
    const { type, shortname } = this.props;
    const { l10n } = this.context;

    if (type === 'group') {
      return null;
    }

    return (
      <Input
        id="shortname"
        name="shortname"
        label={l10n.formatText(`CreateNewModal.${type}.info.shortname`)}
        onChange={this.props.onChange}
        prefix="app.dlg.im/"
        value={shortname}
      />
    );
  }

  render(): React.Element<any> {
    const { type, about, title } = this.props;
    const { l10n } = this.context;

    return (
      <div className={styles.info}>
        {this.renderAvatar()}
        <form autoComplete="off" className={styles.form}>
          <Input
            className={styles.input}
            id="title"
            large
            name="title"
            onChange={this.props.onChange}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.name`)}
            value={title}
          />
          <Input
            className={styles.input}
            id="about"
            label={l10n.formatText(`CreateNewModal.${type}.info.description.label`)}
            large
            name="about"
            onChange={this.props.onChange}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.description.placeholder`)}
            type="textarea"
            value={about}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default CreateNewType;
