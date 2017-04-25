/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */


import type { PeerInfo } from '@dlghq/dialog-types';
import type { Props } from './types';
import type { SelectorState } from '../../entities';
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
import CreateGroupTypeForm from './CreateGroupTypeForm';
import CreateGroupInfoForm from './CreateGroupInfoForm';
import CreateGroupMembersForm from './CreateGroupMembersForm';
import ImageEdit from '../ImageEdit/ImageEdit';
import styles from './CreateNewModal.css';

class CreateNewModal extends PureComponent {
  props: Props;

  static defaultProps = {
    id: 'create_new_group'
  };

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

  handleChange = (value: string, { target }: SyntheticInputEvent) => {
    this.props.onRequestChange({
      ...this.props.request,
      [target.name]: value
    });
  };

  handleMembersChange = (members: SelectorState<PeerInfo>): void => {
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
    this.props.onStepChange('info');
  };

  handleAvatarRemove = (): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar: null
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar
    });
    this.props.onStepChange('avatar');
  };

  handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.request);
  };

  handleCancelAvatarEdit = (): void => {
    this.props.onStepChange('info');
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
    const { id, request: { type }, step } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose pending={this.props.pending} onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateGroupTypeForm
            id={id}
            type={type}
            onChange={this.handleChange}
            onSubmit={this.handleNextStepClick}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            form={id}
            type="submit"
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
    const { id, step, request: { type, about, title, shortname, avatar }, shortnamePrefix } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose pending={this.props.pending} onClick={this.props.onClose} />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateGroupInfoForm
            vertical
            id={id}
            type={type}
            about={about}
            title={title}
            avatar={avatar}
            shortname={shortname}
            shortnamePrefix={shortnamePrefix}
            onChange={this.handleChange}
            onSubmit={this.handleNextStepClick}
            onAvatarRemove={this.handleAvatarRemove}
            onAvatarChange={this.handleAvatarEdit}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            id={id}
            type="submit"
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

  renderAvatarStep(): ?React.Element<any> {
    const { request: { avatar } } = this.props;

    if (avatar && typeof avatar !== 'string') {
      return (
        <div className={styles.wrapper}>
          <ModalHeader className={styles.header} withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleCancelAvatarEdit}
              className={styles.back}
            />
            <Text id="CreateNewModal.avatar_edit" />
            <ModalClose pending={this.props.pending} onClick={this.props.onClose} />
          </ModalHeader>
          {this.renderError()}
          <ModalBody className={styles.body}>
            <ImageEdit
              image={avatar}
              type="circle"
              size={250}
              height={400}
              onSubmit={this.handleAvatarChange}
            />
          </ModalBody>
        </div>
      );
    }

    return null;
  }

  renderMembersStep(): React.Element<any> {
    const { id, request: { type, members } } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose pending={this.props.pending} onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateGroupMembersForm
            id={id}
            members={members}
            autoFocus={this.props.autoFocus}
            onChange={this.handleMembersChange}
            onSubmit={this.handleSubmit}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            className={styles.halfButton}
            onClick={this.handleSubmit}
            rounded={false}
            form={id}
            type="submit"
            theme="success"
            loading={this.props.pending}
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
      case 'avatar':
        return this.renderAvatarStep();
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
