/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
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
  onChange: (settings: $Shape<Settings>) => void
};

class PreferencesNotifications extends PureComponent {
  props: Props;

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

  render(): React.Element<any> {
    const onlyMention = this.props.settings.isOnlyMentionNotifications;
    const groupsEnabled = this.props.settings.isGroupsNotificationsEnabled;
    const showText = this.props.settings.isShowNotificationsTextEnabled;
    const includeMuted = this.props.settings.isCounterIncludeMuted;

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.notifications.title">
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
          <Field>
            <Switcher
              id="includeMuted"
              name="includeMuted"
              value={includeMuted}
              onChange={this.handleIncludeMutedChange}
            >
              <Text id="PreferencesModal.notifications.counter_include_muted" />
            </Switcher>
            <Text id="PreferencesModal.notifications.counter_include_muted_hint" className={styles.hint} />
          </Field>
        </Fieldset>
        <Fieldset legend="PreferencesModal.security.title">
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
