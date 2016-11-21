/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { Contact } from '@dlghq/dialog-types';
import React from 'react';
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
  onChange: (selector: SelectorState<Contact>) => any,
  onClose: () => void,
  onSubmit: () => void
};

function AddMembersModal(props: Props): React.Element<any> {
  const className = classNames(styles.container, props.className);

  return (
    <Modal className={className} onClose={props.onClose}>
      <ModalHeader withBorder>
        <Text id="AddMembersModal.title" />
        <ModalClose onClick={props.onClose} />
      </ModalHeader>
      <ModalBody className={styles.body}>
        <ContactSelector
          autoFocus={false}
          selector={props.selector}
          onChange={props.onChange}
        />
      </ModalBody>
      <ModalFooter className={styles.footer}>
        <Button
          wide
          theme="success"
          rounded={false}
          disabled={props.pending}
          onClick={props.onSubmit}
        >
          <Text id="AddMembersModal.button_add" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddMembersModal;
