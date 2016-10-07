/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalClose from '../ModalClose/ModalClose';
import ModalBody from '../ModalBody/ModalBody';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tab/Tab';
import Fieldset from '../Fieldset/Fieldset';
import Field from '../Field/Field';
import Switcher from '../Switcher/Switcher';
import Radio from '../Radio/Radio';
import styles from './PreferencesModal.css';
import type { Props } from './types';

class PreferencesModal extends Component {
  props: Props;

  handleScreenChange: Function;
  handleChange: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScreenChange = this.handleScreenChange.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.className !== this.props.className ||
           nextProps.preferences !== this.props.preferences ||
           nextProps.screen !== this.props.screen ||
           nextProps.isOpen !== this.props.isOpen;
  }

  handleScreenChange(value: string): void {
    this.props.onScreenChange(value);
  }

  handleChange(value: any, { target }: $FlowIssue): void {
    const { preferences } = this.props;

    this.props.onChange({
      ...preferences,
      [target.name]: value
    });
  }

  handleSubmit(): void {
    const { preferences } = this.props;

    this.props.onSubmit(preferences);
  }

  renderTabs(): React.Element<any> {
    const { screen } = this.props;

    return (
      <Tabs className={styles.tabs}>
        <Tab
          onClick={this.handleScreenChange}
          active={screen === 'general'}
          value="general"
        >
          <Text id="PreferencesModal.general.title" />
        </Tab>
        <Tab
          onClick={this.handleScreenChange}
          active={screen === 'notifications'}
          value="notifications"
        >
          <Text id="PreferencesModal.notifications.title" />
        </Tab>
        <Tab
          onClick={this.handleScreenChange}
          active={screen === 'security'}
          value="security"
        >
          <Text id="PreferencesModal.security.title" />
        </Tab>
        <Tab
          onClick={this.handleScreenChange}
          active={screen === 'shortcuts'}
          value="shortcuts"
        >
          <Text id="PreferencesModal.shortcuts.title" />
        </Tab>
        <Tab
          onClick={this.handleScreenChange}
          active={screen === 'blocked'}
          value="blocked"
        >
          <Text id="PreferencesModal.blocked.title" />
        </Tab>
      </Tabs>
    );
  }

  renderScreen(): ?React.Element<any> {
    const { screen } = this.props;

    switch (screen) {
      case 'general':
        return this.renderGeneralScreen();
      default:
        return null;
    }
  }

  renderGeneralScreen(): React.Element<any> {
    const { preferences: { sendByEnter, isSoundEnabled } } = this.props;

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.general.legend.sending">
          <Field>
            <Radio
              name="sendByEnter"
              id="sendByEnter"
              onChange={this.handleChange}
              value="true"
              defaultChecked={sendByEnter}
            >
              <Text id="PreferencesModal.general.sendByEnter.enable" html />
            </Radio>
          </Field>
          <Field>
            <Radio
              name="sendByEnter"
              id="sendByEnter"
              onChange={this.handleChange}
              defaultChecked={!sendByEnter}
              value="false"
            >
              <Text id="PreferencesModal.general.sendByEnter.disable" html />
            </Radio>
          </Field>
        </Fieldset>
        <Fieldset legend="PreferencesModal.general.legend.other">
          <Field>
            <Switcher
              onChange={this.handleChange}
              value={isSoundEnabled}
              id="isSoundEnabled"
              name="isSoundEnabled"
            >
              <Text id="PreferencesModal.general.sound" />
            </Switcher>
          </Field>
        </Fieldset>
      </div>
    );
  }

  render(): React.Element<any> {
    const { isOpen } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} isOpen={isOpen} onClose={this.handleSubmit}>
        <ModalHeader withBorder>
          <Text id="PreferencesModal.title" />
          <ModalClose onClick={this.handleSubmit} />
        </ModalHeader>
        <ModalBody className={styles.body}>
          {this.renderTabs()}
          {this.renderScreen()}
        </ModalBody>
      </Modal>
    );
  }
}

export default PreferencesModal;
