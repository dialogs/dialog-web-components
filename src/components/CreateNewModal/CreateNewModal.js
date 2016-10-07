/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalClose from '../ModalClose/ModalClose';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import Icon from '../Icon/Icon';
import Radio from '../Radio/Radio';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './CreateNewModal.css';
import type { Props } from './types';

class CreateNewModal extends PureComponent {
  props: Props;

  handleChange: EventHandler;
  handleSubmit: EventHandler;
  handlePrevStepClick: Function;
  handleNextStepClick: Function;

  constructor(props: Props): void {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevStepClick = this.handlePrevStepClick.bind(this);
    this.handleNextStepClick = this.handleNextStepClick.bind(this);
  }

  handlePrevStepClick(): void {
    const { step } = this.props;

    if (step === 'info') {
      this.props.onStepChange('type');
    }
  }

  handleNextStepClick(): void {
    const { step } = this.props;

    if (step === 'type') {
      this.props.onStepChange('info');
    }
  }

  handleChange(value: any, { target }: $FlowIssue): void {
    this.props.onRequestChange({
      ...this.props.request,
      [target.name]: value
    });
  }

  handleSubmit(): void {
    const { request } = this.props;
    this.props.onSubmit(request);
  }

  renderTypeStep(): React.Element<any> {
    const { request: { type } } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Text id={`CreateNewModal.title.${type}`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.type}>
          <Radio
            onChange={this.handleChange}
            name="type"
            value="group"
            defaultChecked={type === 'group'}
          >
            <Text id="CreateNewModal.type.group" className={styles.typeLabel} />
          </Radio>
          <Text
            className={styles.typeHint}
            id="CreateNewModal.hint.group"
            tagName="div"
          />
          <br />
          <Radio
            onChange={this.handleChange}
            name="type"
            value="channel"
            defaultChecked={type === 'channel'}
          >
            <Text id="CreateNewModal.type.channel" className={styles.typeLabel} />
          </Radio>
          <Text
            className={styles.typeHint}
            id="CreateNewModal.hint.channel"
            tagName="div"
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            className={styles.halfButton}
            onClick={this.handleNextStepClick}
            rounded={false}
            theme="success"
            wide
          >
            <Text id="CreateNewModal.next" />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderInfoStep(): React.Element<any> {
    const { request: { type, about, title, shortname } } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.title.${type}`} />
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.info}>
          <form autoComplete="off">
            <Input
              className={styles.input}
              id="title"
              large
              name="title"
              onChange={this.handleChange}
              placeholder="Name This Group"
              value={title}
            />
            <Input
              className={styles.input}
              id="about"
              label="Description - optional"
              large
              name="about"
              onChange={this.handleChange}
              placeholder="Describe the Purpose of This Conversation"
              type="textarea"
              value={about}
            />
            <Input
              id="shortname"
              name="shortname"
              label="Channel link"
              onChange={this.handleChange}
              prefix="app.dlg.im/"
              value={shortname}
            />
          </form>
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            className={styles.halfButton}
            onClick={this.handleSubmit}
            rounded={false}
            theme="success"
            wide
          >
            <Text id={`CreateNewModal.finish.${type}`} />
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
