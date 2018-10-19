/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';
import HotKeys from '../HotKeys/HotKeys';
import modalStyles from '../Modal/Modal.css';
import styles from '../Confirm/Confirm.css';

export type Props = {
  message: string,
  submit: string,
  theme: ColorTheme,
  onSubmit: () => void
};

class Alert extends PureComponent<Props> {
  static defaultProps = {
    theme: 'default'
  };

  handleSubmit = (): void => {
    this.props.onSubmit();
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    switch (hotkey) {
      case 'Enter':
      case 'Escape':
        this.handleSubmit();
        break;
      default:
        // do nothing
    }
  };

  render() {
    const className = classNames(modalStyles.container, styles.container);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal isOpen className={className} overlayClassName={styles.overlay}>
          <div className={modalStyles.wrapper}>
            <ModalBody className={styles.body}>
              <Text id={this.props.message} tagName="h3" className={styles.message} />
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                theme={this.props.theme}
                size="small"
                className={styles.button}
                view="outline"
                onClick={this.handleSubmit}
                id="alert_submit_button"
              >
                <Text id={this.props.submit} />
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </HotKeys>
    );
  }
}

export default Alert;
