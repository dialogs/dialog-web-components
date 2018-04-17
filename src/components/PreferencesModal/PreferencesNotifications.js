/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Fieldset from '../Fieldset/Fieldset';
import Field from '../Field/Field';
import Switcher from '../Switcher/Switcher';
import styles from './PreferencesModal.css';

export type Settings = {
  isCounterIncludeMuted: boolean,
  isOnlyMentionNotifications: boolean,
  isGroupsNotificationsEnabled: boolean,
  isShowNotificationsTextEnabled: boolean
};

export type Props = {
  settings: Settings,
  onChange: (settings: $Shape<Settings>) => mixed
};

class PreferencesNotifications extends PureComponent<Props> {
  handleOnlyMentionChange = (value: boolean) => {
    this.props.onChange({
      isOnlyMentionNotifications: value
    });
  };

  handleGroupsChange = (value: boolean) => {
    this.props.onChange({
      isGroupsNotificationsEnabled: value
    });
  };

  handleShowTextChange = (value: boolean) => {
    this.props.onChange({
      isShowNotificationsTextEnabled: value
    });
  };

  handleIncludeMutedChange = (value: boolean) => {
    this.props.onChange({
      isCounterIncludeMuted: value
    });
  };

  render() {
    const onlyMention = this.props.settings.isOnlyMentionNotifications;
    const groupsEnabled = this.props.settings.isGroupsNotificationsEnabled;
    const showText = this.props.settings.isShowNotificationsTextEnabled;
    const includeMuted = this.props.settings.isCounterIncludeMuted;

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.notifications.title">
          <Field>
            <Switcher
              id="preferences_notifications_groups_enabled"
              value={groupsEnabled}
              name="groupsEnabled"
              onChange={this.handleGroupsChange}
              label="PreferencesModal.notifications.notifications"
            />
          </Field>
          <Field>
            <Switcher
              id="preferences_notifications_only_mention"
              name="onlyMention"
              value={onlyMention}
              onChange={this.handleOnlyMentionChange}
              label="PreferencesModal.notifications.mention"
              hint="PreferencesModal.notifications.mention_hint"
            />
          </Field>
          <Field>
            <Switcher
              id="preferences_notifications_include_muted"
              name="includeMuted"
              value={includeMuted}
              onChange={this.handleIncludeMutedChange}
              label="PreferencesModal.notifications.counter_include_muted"
              hint="PreferencesModal.notifications.counter_include_muted_hint"
            />
          </Field>
        </Fieldset>
        <Fieldset legend="PreferencesModal.security.title">
          <Field>
            <Switcher
              id="preferences_notifications_show_text"
              name="showText"
              value={showText}
              onChange={this.handleShowTextChange}
              label="PreferencesModal.notifications.preview"
              hint="PreferencesModal.notifications.preview_hint"
            />
          </Field>
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesNotifications;
