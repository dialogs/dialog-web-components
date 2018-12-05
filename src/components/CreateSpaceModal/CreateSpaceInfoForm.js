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
import styles from './CreateSpaceModal.css';

export type Props = {
  id: string,
  title: string,
  shortname: string,
  shortnamePrefix: ?string,
  avatar: ?File,
  className?: string,
  vertical: boolean,
  onSubmit: (event: SyntheticEvent<>) => void,
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
  onAvatarRemove: () => void,
  onAvatarChange: (avatar: File) => void,
};

export type State = {
  avatar: ?string,
};

export type Context = ProviderContext;

class CreateSpaceInfoForm extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType,
  };

  static defaultProps = {
    vertical: false,
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      avatar: null,
    };
  }

  componentDidMount() {
    if (this.props.avatar) {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.avatar !== this.props.avatar && this.props.avatar) {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  renderAvatar() {
    const { title } = this.props;
    const { avatar } = this.state;

    if (avatar) {
      return (
        <div className={styles.avatarBlock}>
          <AvatarSelector
            title={title}
            placeholder="empty"
            avatar={avatar}
            size={140}
            onRemove={this.props.onAvatarRemove}
            onChange={this.props.onAvatarChange}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const { id, title, vertical, shortname } = this.props;
    const { l10n } = this.context;
    const className = classNames(
      styles.info,
      {
        [styles.vertical]: vertical,
      },
      this.props.className,
    );

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form
          id={id}
          autoComplete="off"
          className={styles.form}
          onSubmit={this.handleSubmit}
        >
          <InputNext
            className={styles.input}
            id={`${id}_title`}
            name="title"
            onChange={this.props.onChange}
            placeholder={l10n.formatText(
              'CreateSpaceModal.info.title.placeholder',
            )}
            label={l10n.formatText('CreateSpaceModal.info.title.label')}
            value={title}
            htmlAutoFocus
          />
          <InputNext
            id={`${id}_shortname`}
            name="shortname"
            value={shortname}
            prefix={this.props.shortnamePrefix}
            label="CreateSpaceModal.info.shortname.label"
            placeholder="CreateSpaceModal.info.shortname.placeholder"
            onChange={this.props.onChange}
          />
        </form>
      </div>
    );
  }
}

export default CreateSpaceInfoForm;
