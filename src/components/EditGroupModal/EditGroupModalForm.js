/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint-disable react/no-unused-prop-types */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from '../CreateNewModal/CreateNewModal.css';

type Field<T> = {
  value: T,
  error: ?string,
  pending: boolean
};

export type Props = {
  type: 'group' | 'channel',
  name: Field<string>,
  shortname: Field<?string>,
  about: Field<?string>,
  avatar: ?string | ?File,
  className?: string,
  vertical: boolean,
  onChange: () => void;
  onAvatarChange: (avatar: File) => void;
  onAvatarRemove: () => void;
}

export type State = {
  avatar: ?string
}

export type Context = ProviderContext;

class EditGroupModalForm extends PureComponent {
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
      avatar: typeof props.avatar === 'string' ? props.avatar : null
    };
  }

  componentDidMount() {
    if (this.props.avatar && typeof this.props.avatar !== 'string') {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.avatar) {
      if (typeof nextProps.avatar === 'string') {
        this.setState({ avatar: nextProps.avatar });
      } else {
        fileToBase64(nextProps.avatar, (avatar) => this.setState({ avatar }));
      }
    }
  }

  renderAvatar(): React.Element<any> {
    const { name } = this.props;
    const { avatar } = this.state;
    const { l10n } = this.context;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={name.value}
          placeholder="empty"
          avatar={avatar}
          onChange={this.props.onAvatarChange}
        />
        {
          this.state.avatar ? (
            <Button onClick={this.props.onAvatarRemove} theme="danger" view="link" size="small">
              {l10n.formatText('CreateNewModal.avatar.remove')}
            </Button>
          ) : null
        }
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
        value={shortname.value}
        status={shortname.error ? 'error' : 'normal'}
      />
    );
  }

  render(): React.Element<any> {
    const { type, about, name, vertical } = this.props;
    const { l10n } = this.context;
    const className = classNames(styles.info, {
      [styles.vertical]: vertical
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form autoComplete="off" className={styles.form}>
          <Input
            className={styles.input}
            id="name"
            large
            name="name"
            onChange={this.props.onChange}
            status={name.error ? 'error' : 'normal'}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.name`)}
            value={name.value}
          />
          {this.renderShortname()}
          <Input
            className={styles.input}
            id="about"
            label={l10n.formatText(`CreateNewModal.${type}.info.description.label`)}
            large
            name="about"
            status={about.error ? 'error' : 'normal'}
            onChange={this.props.onChange}
            placeholder={l10n.formatText(`CreateNewModal.${type}.info.description.placeholder`)}
            type="textarea"
            value={about.value}
          />
        </form>
      </div>
    );
  }
}

export default EditGroupModalForm;
