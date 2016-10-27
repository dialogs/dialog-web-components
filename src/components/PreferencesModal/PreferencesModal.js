/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Settings as GeneralSettings } from './PreferencesGeneral';
import type { Settings as NotificationSettings } from './PreferencesNotifications';
import type { Props, PreferencesScreen } from './types';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalClose from '../ModalClose/ModalClose';
import ModalBody from '../ModalBody/ModalBody';
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

  handleClose: Function;
  handleSettingsChange: Function;
  handleSettingsSave: Function;
  handleScreenChange: Function;

  constructor(props: Props) {
    super(props);
    console.debug(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleScreenChange = this.handleScreenChange.bind(this);
    this.handleSettingsSave = _.debounce(this.handleSettingsSave.bind(this), 100, {
      leading: true,
      maxWait: 300
    });
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    this.props.onSettingsLoad();
  }

  handleClose(): void {
    if (!this.isPending()) {
      this.props.onClose();
    }
  }

  handleSettingsChange(settings: GeneralSettings | NotificationSettings): void {
    this.handleSettingsSave();
    this.props.onSettingsChange({
      ...this.props.settings.value,
      ...settings
    });
  }

  handleSettingsSave() {
    if (this.props.settings.value) {
      this.props.onSettingsSave(this.props.settings.value);
    }
  }

  handleScreenChange(value: PreferencesScreen): void {
    this.props.onScreenChange(value);
    switch (value) {
      case 'general':
      case 'notifications':
        this.props.onSettingsLoad();
        break;

      case 'security':
        this.props.onSessionsLoad();
        break;

      case 'blocked':
        this.props.onBlockedLoad();
        break;

      default:
        // do nothing
    }
  }

  isPending(): boolean {
    const { screen, settings, sessions, blocked } = this.props;
    switch (screen) {
      case 'general':
      case 'notifications':
        return settings.pending;

      case 'security':
        return sessions.pending;

      case 'blocked':
        return blocked.pending;

      default:
        return false;
    }
  }

  renderScreen(): ?React.Element<any> {
    const { screen, settings, sessions, blocked } = this.props;

    const spinner = (
      <div className={styles.spinnerScreen}>
        <Spinner size="large" />
      </div>
    );

    switch (screen) {
      case 'general':
        if (!settings.value) {
          return spinner;
        }

        return (
          <PreferencesGeneral
            settings={settings.value}
            onChange={this.handleSettingsChange}
          />
        );

      case 'notifications':
        if (!settings.value) {
          return spinner;
        }

        return (
          <PreferencesNotifications
            settings={settings.value}
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

  render(): React.Element<any> {
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
              { id: 'general', title: 'PreferencesModal.general.title' },
              { id: 'notifications', title: 'PreferencesModal.notifications.title' },
              { id: 'security', title: 'PreferencesModal.security.title' },
              { id: 'blocked', title: 'PreferencesModal.blocked.title' }
            ]}
            onPick={this.handleScreenChange}
          />
          <Scroller className={styles.scroller}>
            {this.renderScreen()}
          </Scroller>
        </ModalBody>
      </Modal>
    );
  }
}

export default PreferencesModal;
