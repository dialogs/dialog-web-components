/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import CreateNewType from './CreateNewType';
import CreateNewInfo from './CreateNewInfo';
import CreateNewMembers from './CreateNewMembers';
import styles from './CreateNewModal.css';
import type { SelectorState } from '../../entities';
import type { Contact } from '@dlghq/dialog-types';
import type { Props } from './types';

class CreateNewModal extends PureComponent {
  props: Props;

  handlePrevStepClick = (): void => {
    const { step } = this.props;

    if (step === 'info') {
      this.props.onStepChange('type');
    }

    if (step === 'members') {
      this.props.onStepChange('info');
    }
  };

  handleNextStepClick = (): void => {
    const { step } = this.props;

    if (step === 'type') {
      this.props.onStepChange('info');
    }

    if (step === 'info') {
      this.props.onStepChange('members');
    }
  };

  handleChange = (value: any, { target }: $FlowIssue): void => {
    this.props.onRequestChange({
      ...this.props.request,
      [target.name]: value
    });
  };

  handleMembersChange = (members: SelectorState<Contact>): void => {
    this.props.onRequestChange({
      ...this.props.request,
      members
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar
    });
  };

  handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.request);
  };

  renderError(): ?React.Element<any> {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div className={styles.error}>{error}</div>
    );
  }

  renderTypeStep(): React.Element<any> {
    const { request: { type }, step } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateNewType onChange={this.handleChange} type={type} />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            onClick={this.handleNextStepClick}
          >
            <Text id={`CreateNewModal.next.${step}`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderInfoStep(): React.Element<any> {
    const { request: { type, about, title, shortname, avatar }, step } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateNewInfo
            vertical
            type={type}
            about={about}
            title={title}
            avatar={avatar}
            shortname={shortname}
            onChange={this.handleChange}
            onAvatarChange={this.handleAvatarChange}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            onClick={this.handleNextStepClick}
          >
            <Text id={`CreateNewModal.next.${step}`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderMembersStep(): React.Element<any> {
    const { request: { type, members } } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateNewMembers
            members={members}
            autoFocus={this.props.autoFocus}
            onChange={this.handleMembersChange}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            className={styles.halfButton}
            onClick={this.handleSubmit}
            rounded={false}
            theme="success"
            disabled={this.props.pending}
            wide
          >
            <Text id={`CreateNewModal.${type}.finish`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderStep(): ?React.Element<any> {
    const { step } = this.props;

    switch (step) {
      case 'type':
        return this.renderTypeStep();
      case 'info':
        return this.renderInfoStep();
      case 'members':
        return this.renderMembersStep();
      default:
        return null;
    }
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        {this.renderStep()}
      </Modal>
    );
  }
}

export default CreateNewModal;
