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
import CreateNewInfo from '../CreateNewModal/CreateNewInfo';
import styles from './EditGroupModal.css';
import type { Props } from './types';

class EditGroupModal extends PureComponent {
  props: Props;

  handleChange = (value: any, { target }: $FlowIssue): void => {
    this.props.onChange({
      ...this.props.info,
      [target.name]: value
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.props.onChange({
      ...this.props.info,
      avatar
    });
  };

  render(): React.Element<any> {
    const { info: { type, title, shortname, about, avatar } } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id={`EditGroupModal.title.${type}`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateNewInfo
            className={styles.info}
            type={type}
            title={title}
            shortname={shortname}
            about={about}
            avatar={avatar}
            onChange={this.handleChange}
            onAvatarChange={this.handleAvatarChange}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            onClick={this.props.onSubmit}
          >
            <Text id="EditGroupModal.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}


export default EditGroupModal;
