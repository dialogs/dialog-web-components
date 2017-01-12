/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import modalStyles from '../Modal/Modal.css';
import styles from './Confirm.css';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';

export type ConfirmRequest = {
  question: string,
  submit: string,
  cancel: string,
  theme: 'danger' | 'success' | 'warning'
};

export type Props = {
  request: ConfirmRequest,
  onSubmit: (confirmed: boolean) => void
};

class Confirm extends PureComponent {
  props: Props;

  handleSuccess = (): void => {
    this.props.onSubmit(true);
  };

  handleCancel = (): void => {
    this.props.onSubmit(false);
  };

  render() {
    const className = classNames(modalStyles.container, styles.container);

    return (
      <div className={className}>
        <div className={modalStyles.wrapper}>
          <ModalBody className={styles.body}>
            <h3 className={styles.question}>
              {this.props.request.question}
            </h3>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              theme="primary"
              size="small"
              className={styles.button}
              view="outline"
              onClick={this.handleCancel}
            >
              {this.props.request.cancel}
            </Button>
            <Button
              className={styles.button}
              view="outline"
              size="small"
              theme={this.props.request.theme}
              onClick={this.handleSuccess}
            >
              {this.props.request.submit}
            </Button>
          </ModalFooter>
        </div>
      </div>
    );
  }
}

export default Confirm;
