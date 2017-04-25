/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import Input from '../Input/Input';
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
  onSubmit: (event: SyntheticEvent) => void,
  onChange: (value: string, event: SyntheticInputEvent) => void,
  onAvatarRemove: () => void,
  onAvatarChange: (avatar: File) => void
}
export type State = {
  avatar: ?string
}

export type Context = ProviderContext;

class CreateGroupInfoForm extends PureComponent {
  props: Props;
  state: State;

  static defaultProps = {
    vertical: false
  };

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
    } else {
      this.setState({ avatar: nextProps.avatar });
    }
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  renderAvatar(): React.Element<any> {
    const { title } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={title}
          placeholder="empty"
          avatar={avatar}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname(): ?React.Element<any> {
    const { type, shortname } = this.props;

    if (type === 'group') {
      return null;
    }

    return (
      <Input
        id="shortname"
        name="shortname"
        value={shortname || ''}
        prefix={this.props.shortnamePrefix}
        label={`CreateNewModal.${type}.info.shortname`}
        onChange={this.props.onChange}
      />
    );
  }

  render(): React.Element<any> {
    const { id, type, about, title, vertical } = this.props;
    const { l10n } = this.context;
    const className = classNames(styles.info, {
      [styles.vertical]: vertical
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form id={id} autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
          <Input
            className={styles.input}
            id="title"
            large
            name="title"
            onChange={this.props.onChange}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.name`)}
            value={title}
            htmlAutoFocus
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
            value={about || ''}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default CreateGroupInfoForm;
