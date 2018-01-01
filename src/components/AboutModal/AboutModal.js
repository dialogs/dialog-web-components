/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';
import ModalBody from '../Modal/ModalBody';
import Logo from '../Logo/Logo';
import ButtonNext from '../ButtonNext/ButtonNext';
import styles from './AboutModal.css';

type Props = {
  className?: string,
  appName: string,
  appVersion: string,
  updateState: Field<'upToDate' | 'available'>,
  onCheck: () => mixed,
  onUpdate: () => mixed,
  onClose: () => mixed
}

class AboutModal extends PureComponent<Props> {
  renderState() {
    const { appName, updateState } = this.props;

    if (updateState.error) {
      return (
        <div className={styles.error}>{updateState.error.message}</div>
      );
    }

    if (updateState.pending) {
      return (
        <Text id={`AboutModal.pending.${updateState.value}`} values={{ appName }} />
      );
    }

    return (
      <Text id={`AboutModal.state.${updateState.value}`} values={{ appName }} />
    );
  }

  renderUpdateButton() {
    const { updateState } = this.props;

    if (!updateState.error && updateState.value === 'available') {
      return (
        <ButtonNext
          size="small"
          id="about_update_button"
          loading={updateState.pending}
          onClick={this.props.onUpdate}
          className={styles.button}
        >
          <Text id="AboutModal.update" />
        </ButtonNext>
      );
    }

    return (
      <ButtonNext
        size="small"
        id="about_check_button"
        loading={updateState.pending}
        onClick={this.props.onCheck}
        className={styles.button}
      >
        <Text id="AboutModal.check" />
      </ButtonNext>
    );
  }

  render() {
    const { appName, appVersion } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalBody className={styles.body}>
          <Icon
            id="about_close_button"
            size={20}
            glyph="close"
            onClick={this.props.onClose}
            className={styles.close}
          />
          <Logo className={styles.logo} />
          <h1 className={styles.appName}>{appName}</h1>
          <Text
            id="AboutModal.version"
            values={{ appVersion }}
            tagName="div"
            className={styles.version}
          />
          <div className={styles.state}>
            {this.renderState()}
          </div>
          {this.renderUpdateButton()}
        </ModalBody>
      </Modal>

    );
  }
}

export default AboutModal;
