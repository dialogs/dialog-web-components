/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import EditGroupModalForm from './EditGroupModalForm';
import styles from './EditGroupModal.css';
import type { Props, State } from './types';

class EditGroupModal extends PureComponent {
  props: Props;
  state: State;

  handleChange: (value: any, event: $FlowIssue) => void;
  handleSubmit: (event: SyntheticEvent) => void;
  handleAvatarChange: (avatar: File[]) => void;
  handleAvatarRemove: () => void;
  isChanged: () => boolean

  constructor(props: Props) {
    super(props);

    this.state = {
      name: {
        ...props.name,
        value: props.group.name
      },
      shortname: {
        ...props.shortname,
        value: props.group.shortname
      },
      about: {
        ...props.about,
        value: props.group.about
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarRemove = this.handleAvatarRemove.bind(this);
  }

  handleChange(value: any, { target }: $FlowIssue) {
    this.setState({
      [target.name]: { ...this.state[target.name], value }
    });
  }

  handleSubmit(event: SyntheticEvent): void {
    event.preventDefault();

    if (this.state.name.value !== this.props.group.name) {
      this.props.onNameChange(this.props.group.id, this.state.name.value);
    }

    if (this.state.shortname && this.state.shortname.value !== this.props.group.shortname) {
      this.props.onShortnameChange(this.props.group.id, this.state.shortname.value);
    }

    if (this.state.about && this.state.about.value !== this.props.group.about) {
      this.props.onAboutChange(this.props.group.id, this.state.about.value);
    }
  }

  handleAvatarChange(avatar: File): void {
    this.props.onAvatarChange(this.props.group.id, avatar);
  }

  handleAvatarRemove(): void {
    this.props.onAvatarRemove(this.props.group.id);
  }

  isChanged(): boolean {
    return this.state.name.value !== this.props.group.name ||
           this.state.shortname.value !== this.props.group.shortname ||
           this.state.about.value !== this.props.group.about;
  }

  render(): React.Element<any> {
    const { group } = this.props;
    const { name, shortname, about } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id={`EditGroupModal.title.${this.props.group.type}`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>

        <ModalBody className={styles.body}>
          <EditGroupModalForm
            className={styles.info}
            type={group.type}
            name={name}
            shortname={shortname}
            about={about}
            avatar={group.avatar}
            onChange={this.handleChange}
            onAvatarChange={this.handleAvatarChange}
            onAvatarRemove={this.handleAvatarRemove}
          />
        </ModalBody>

        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            disabled={!this.isChanged()}
            onClick={this.handleSubmit}
          >
            <Text id="EditGroupModal.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}


export default EditGroupModal;
