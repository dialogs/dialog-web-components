/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
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

class CreateNewModal extends Component {
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

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.request !== this.props.request ||
           nextProps.step !== this.props.step ||
           nextProps.isOpen !== this.props.isOpen ||
           nextProps.className !== this.props.className;
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

  handleChange(value: any, { target }: SyntheticEvent): void {
    if (target instanceof HTMLInputElement) {
      this.props.onChange({
        ...this.props.request,
        [target.name]: value
      });
    }
  }

  handleSubmit(): void {
    const { request } = this.props;
    this.props.onSubmit(request);
  }

  renderStep(): ?React.Element<any> {
    const { step, request } = this.props;

    switch (step) {
      case 'type':
        return (
          <div className={styles.wrapper}>
            <ModalHeader className={styles.header} withBorder>
              Selelct type
              <ModalClose onClick={this.props.onClose} />
            </ModalHeader>
            <ModalBody className={styles.type}>
              <Radio
                onChange={this.handleChange}
                name="type"
                value="group"
                defaultChecked={request.type === 'group'}
              >
                Group
              </Radio>
              <br />
              <Radio
                onChange={this.handleChange}
                name="type"
                value="channel"
                defaultChecked={request.type === 'channel'}
              >
                Channel
              </Radio>
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                className={styles.halfButton}
                onClick={this.handleNextStepClick}
                rounded={false}
                theme="success"
                wide
              >
                Next step
              </Button>
            </ModalFooter>
          </div>
        );
      case 'info':
        return (
          <div className={styles.wrapper}>
            <ModalHeader className={styles.header} withBorder>
              <Icon
                glyph="arrow_back"
                onClick={this.handlePrevStepClick}
                className={styles.back}
              />
              Info
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
                  value={request.title}
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
                  value={request.about}
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
                Finish
              </Button>
            </ModalFooter>
          </div>
        );
      default:
        return null;
    }
  }

  render(): React.Element<any> {
    const { isOpen } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal isOpen={isOpen} onClose={this.props.onClose} className={className}>
        {this.renderStep()}
      </Modal>
    );
  }
}

export default CreateNewModal;
