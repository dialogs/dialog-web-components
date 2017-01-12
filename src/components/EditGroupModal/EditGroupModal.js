/**
 * Copyright 2016 dialog LLC <info@dlg.im>
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

  constructor(props: Props) {
    super(props);

    this.state = {
      name: props.group.name,
      about: props.group.about,
      shortname: props.group.shortname
    };
  }

  handleChange = (value: any, { target }: $FlowIssue) => {
    this.setState({ [target.name]: value });
  };

  handleSubmit = (event: SyntheticEvent): void => {
    const { group } = this.props;
    const { name, about, shortname } = this.state;

    event.preventDefault();

    if (name !== group.name) {
      this.props.onNameChange(group.id, name);
    }

    if (about && about !== group.about) {
      this.props.onAboutChange(group.id, about);
    }

    if (shortname && shortname !== group.shortname) {
      this.props.onShortnameChange(group.id, shortname);
    }
  };

  handleAvatarChange = (avatar: File): void => {
    this.props.onAvatarChange(this.props.group.id, avatar);
  };

  handleAvatarRemove = (): void => {
    this.props.onAvatarRemove(this.props.group.id);
  };

  isChanged(): boolean {
    const { group } = this.props;
    const { name, about, shortname } = this.state;

    return name !== group.name ||
           about !== group.about ||
           shortname !== group.shortname;
  }

  render(): React.Element<any> {
    const { group } = this.props;
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
            name={{ ...this.props.name, value: this.state.name }}
            about={{ ...this.props.about, value: this.state.about }}
            shortname={{ ...this.props.shortname, value: this.state.shortname }}
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
