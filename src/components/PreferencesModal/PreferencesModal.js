/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProfileSettings } from '@dlghq/dialog-types';
import type { Props } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import Spinner from '../Spinner/Spinner';
import Tabs from '../Tabs/Tabs';
import Scroller from '../Scroller/Scroller';
import PreferencesGeneral from './PreferencesGeneral';
import PreferencesNotifications from './PreferencesNotifications';
import PreferencesSecurity from './PreferencesSecurity/PreferencesSecurity';
import PreferencesBlocked from './PreferencesBlocked/PreferencesBlocked';
import styles from './PreferencesModal.css';

class PreferencesModal extends PureComponent {
  props: Props;

  handleClose = (): void => {
    if (!this.isPending()) {
      this.props.onClose();
    }
  };

  handleSettingsChange = (settings: $Shape<ProfileSettings>): void => {
    this.props.onSettingsChange({
      ...this.props.settings,
      ...settings
    });
  };

  handleScreenChange = (value: string): void => {
    this.props.onScreenChange(value);
    switch (value) {
      case 'security':
        this.props.onSessionsLoad();
        break;

      case 'blocked':
        this.props.onBlockedLoad();
        break;

      default:
      // do nothing
    }
  };

  isPending(): boolean {
    const { screen, sessions, blocked } = this.props;
    switch (screen) {
      case 'security':
        return sessions.pending;

      case 'blocked':
        return blocked.pending;

      default:
        return false;
    }
  }

  renderScreen() {
    const { screen, settings, sessions, blocked } = this.props;

    const spinner = (
      <div className={styles.spinnerScreen}>
        <Spinner size="large" />
      </div>
    );

    switch (screen) {
      case 'general':
        return (
          <PreferencesGeneral
            settings={settings}
            onChange={this.handleSettingsChange}
          />
        );

      case 'notifications':
        return (
          <PreferencesNotifications
            settings={settings}
            onChange={this.handleSettingsChange}
          />
        );

      case 'security':
        if (!sessions.value) {
          return spinner;
        }

        return (
          <PreferencesSecurity
            sessions={sessions.value}
            onSessionTerminate={this.props.onSessionTerminate}
            onAllSessionsTerminate={this.props.onAllSessionsTerminate}
          />
        );

      case 'blocked':
        if (!blocked.value) {
          return spinner;
        }

        return (
          <PreferencesBlocked
            blocked={blocked.value}
            onUnblockUser={this.props.onUnblockUser}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { screen } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id="PreferencesModal.title" />
          <ModalClose pending={this.isPending()} onClick={this.props.onClose} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <Tabs
            className={styles.tabs}
            current={screen}
            variants={[
              {
                id: 'general',
                title: 'PreferencesModal.general.title'
              },
              {
                id: 'notifications',
                title: 'PreferencesModal.notifications.title'
              },
              {
                id: 'security',
                title: 'PreferencesModal.security.title'
              },
              {
                id: 'blocked',
                title: 'PreferencesModal.blocked.title'
              }
            ]}
            onPick={this.handleScreenChange}
          />
          <div className={styles.scroller}>
            <Scroller>
              {this.renderScreen()}
            </Scroller>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default PreferencesModal;
