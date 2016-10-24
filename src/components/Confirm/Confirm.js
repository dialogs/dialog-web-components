/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component, createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import classNames from 'classnames';
import modalStyles from '../Modal/Modal.css';
import styles from './Confirm.css';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import Button from '../Button/Button';
// import { Text } from '@dlghq/react-l10n';

export type ConfirmRequest = {
  question: string,
  submit: string,
  cancel: string,
  theme: 'danger' | 'success' | 'primary'
};

export type Props = {
  request: ConfirmRequest,
  cleanup: () => void,
  callback: (confirmed: boolean) => void
}

export class ConfirmModal extends Component {
  props: Props;

  handleSuccess: () => void;
  handleCancel: () => void;

  constructor(props: Props) {
    super(props);

    this.handleSuccess =  this.handleSuccess.bind(this);
    this.handleCancel =  this.handleCancel.bind(this);
  }

  handleSuccess() {
    this.props.callback(true);
    this.props.cleanup();
  }

  handleCancel() {
    this.props.callback(false);
    this.props.cleanup();
  }

  render() {
    const className = classNames(modalStyles.root, styles.container);

    return (
      <div className={className}>
        <div className={modalStyles.wrapper}>
          <ModalBody className={styles.body}>
            <h3 className={styles.question}>{this.props.request.question}</h3>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              onClick={this.handleCancel}
              className={styles.button}
            >
              {/*<Text id={this.props.request.cancel} />*/}
              {this.props.request.cancel}
            </Button>
            <Button
              onClick={this.handleSuccess}
              theme={this.props.request.theme}
              className={styles.button}
            >
              {/*<Text id={this.props.request.submit} />*/}
              {this.props.request.submit}
            </Button>
          </ModalFooter>
        </div>
      </div>
    );
  }
}

function Confirm(request: ConfirmRequest, callback: (confirmed: boolean) => void): void {
  const element = document.createElement('div');
  element.className = modalStyles.overlay;
  const wrapper = document.body.appendChild(element);

  function cleanup() {
    unmountComponentAtNode(wrapper);
    setImmediate(() => wrapper.remove());
  }

  render(createElement(ConfirmModal, { request, callback, cleanup }), wrapper);
}

export default Confirm;
