/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { Contact } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import ContactSelector from '../ContactSelector/ContactSelector';
import styles from './AddMembersModal.css';

export type Props = {
  className?: string,
  pending: boolean,
  selector: SelectorState<Contact>,
  onClose: () => any,
  onSubmit: (uids: number[]) => any,
  onChange: (selector: SelectorState<Contact>) => any
};

class AddMembersModal extends PureComponent {
  props: Props;

  handleClose = (): void => {
    if (!this.props.pending) {
      this.props.onClose();
    }
  };

  handleSubmit = (): void => {
    const selected = this.props.selector.getSelected();
    this.props.onSubmit(
      selected.map((contact) => contact.uid).toArray()
    );
  };

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.handleClose}>
        <ModalHeader withBorder>
          <Text id="AddMembersModal.title" />
          <ModalClose onClick={this.handleClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <ContactSelector
            autoFocus={false}
            selector={this.props.selector}
            onChange={this.props.onChange}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            disabled={this.props.pending}
            onClick={this.handleSubmit}
          >
            <Text id="AddMembersModal.button_add" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddMembersModal;
