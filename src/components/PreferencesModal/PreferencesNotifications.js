/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../Fieldset/Fieldset';
import Field from '../Field/Field';
import Switcher from '../Switcher/Switcher';
import styles from './PreferencesModal.css';

export type Settings = {
  isOnlyMentionNotifications: boolean,
  isGroupsNotificationsEnabled: boolean,
  isShowNotificationsTextEnabled: boolean
};

export type Props = {
  settings: Settings,
  onChange: (settings: Settings) => any
};

class PreferencesNotifications extends PureComponent {
  props: Props;

  handleOnlyMentionChange: Function;
  handleGroupsChange: Function;
  handleShowTextChange: Function;

  constructor(props: Props) {
    super(props);

    this.handleOnlyMentionChange = this.handleOnlyMentionChange.bind(this);
    this.handleGroupsChange = this.handleGroupsChange.bind(this);
    this.handleShowTextChange = this.handleShowTextChange.bind(this);
  }

  handleOnlyMentionChange(value: boolean): void {
    this.props.onChange({
      ...this.props.settings,
      isOnlyMentionNotifications: value
    });
  }

  handleGroupsChange(value: boolean): void {
    this.props.onChange({
      ...this.props.settings,
      isGroupsNotificationsEnabled: value
    });
  }

  handleShowTextChange(value: boolean): void {
    this.props.onChange({
      ...this.props.settings,
      isShowNotificationsTextEnabled: value
    });
  }

  render(): React.Element<any> {
    const onlyMention = this.props.settings.isOnlyMentionNotifications;
    const groupsEnabled = this.props.settings.isGroupsNotificationsEnabled;
    const showText = this.props.settings.isShowNotificationsTextEnabled;

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.notifications.legend.notifications">
          <Field>
            <Switcher
              id="groupsEnabled"
              value={groupsEnabled}
              name="groupsEnabled"
              onChange={this.handleGroupsChange}
            >
              <Text id="PreferencesModal.notifications.notifications" />
            </Switcher>
          </Field>
          <Field>
            <Switcher
              id="onlyMention"
              name="onlyMention"
              value={onlyMention}
              onChange={this.handleOnlyMentionChange}
            >
              <Text id="PreferencesModal.notifications.mention" />
            </Switcher>
            <Text id="PreferencesModal.notifications.mention_hint" className={styles.hint} />
          </Field>
        </Fieldset>
        <Fieldset legend="PreferencesModal.notifications.legend.privacy">
          <Field>
            <Switcher
              id="showText"
              name="showText"
              value={showText}
              onChange={this.handleShowTextChange}
            >
              <Text id="PreferencesModal.notifications.preview" />
            </Switcher>
            <Text id="PreferencesModal.notifications.preview_hint" className={styles.hint} />
          </Field>
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesNotifications;
