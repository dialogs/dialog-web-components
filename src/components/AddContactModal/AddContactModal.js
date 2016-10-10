/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalClose from '../ModalClose/ModalClose';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import ErrorMessage from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Button from '../Button/Button';
import styles from './AddContactModal.css';

export type Props = {
  className?: string,
  query: string,
  error: ?Error,
  pending: boolean,
  contact: ?User,
  onClose: () => any,
  onChange: (query: string) => any,
  onSearch: (query: string) => any,
  onSubmit: (id: number) => any
};

class AddContactModal extends PureComponent {
  props: Props;
  handleSearch: Function;
  handleAddClick: Function;
  handleQueryChange: Function;

  constructor(props: Props) {
    super(props);

    this.handleSearch = debounce(this.handleSearch.bind(this), 100);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleSearch(query: string): void {
    this.props.onSearch(query);
  }

  handleAddClick(): void {
    if (this.props.contact) {
      this.props.onSubmit(this.props.contact.id);
    }
  }

  handleQueryChange(query: string): void {
    this.handleSearch(query);
    this.props.onChange(query);
  }

  isLocked(): boolean {
    const { pending, contact } = this.props;
    return pending || !contact;
  }

  renderContact() {
    const { error, pending, contact } = this.props;
    if (error) {
      return (
        <ErrorMessage>{error.message}</ErrorMessage>
      );
    }

    if (pending) {
      return (
        <Spinner type="round" size="large" />
      );
    }

    if (contact) {
      return (
        <div>
          <div className={styles.avatar}>
            <PeerAvatar peer={contact} size="big" />
            <Icon glyph="done" className={styles.icon} />
          </div>
          <Text
            id="AddContactModal.user_added"
            values={{ username: contact.name }}
            tagName="p"
            className={styles.text}
            html
          />
        </div>
      );
    }

    return (
      <Text id="AddContactModal.not_found" />
    );
  }

  renderBody() {
    const { query } = this.props;

    return (
      <ModalBody className={styles.body}>
        <Input
          className={styles.input}
          id="add_contact_query"
          type="text"
          value={query}
          hint="AddContactModal.hint"
          placeholder="AddContactModal.placeholder"
          onChange={this.handleQueryChange}
        />
        {this.renderContact()}
      </ModalBody>
    );
  }

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id="AddContactModal.title" />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        {this.renderBody()}
        <ModalFooter className={styles.footer}>
          <Button
            wide
            rounded={false}
            disabled={this.isLocked()}
            onClick={this.handleAddClick}
          >
            <Text id="AddContactModal.button_add" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddContactModal;
