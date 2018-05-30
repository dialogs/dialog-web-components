/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../Fieldset/Fieldset';
import Field from '../Field/Field';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import Switcher from '../Switcher/Switcher';
import isMacOS from '../../utils/isMacOS';
import styles from './PreferencesModal.css';

export type Settings = {
  isSendByEnter: boolean,
  isDebugEnabled: boolean,
  isSoundEffectsEnabled: boolean
};

export type Props = {
  settings: Settings,
  onChange: (settings: $Shape<Settings>) => mixed
};

class PreferencesGeneral extends PureComponent<Props> {
  handleSendByChange = (value: string): void => {
    this.props.onChange({
      isSendByEnter: value === 'enter'
    });
  };

  handleSoundChange = (isSoundEffectsEnabled: boolean): void => {
    this.props.onChange({ isSoundEffectsEnabled });
  };

  handleDebugChange = (isDebugEnabled: boolean): void => {
    this.props.onChange({ isDebugEnabled });
  }

  render() {
    const sendBy = this.props.settings.isSendByEnter ? 'enter' : 'shift_enter';
    const { isDebugEnabled, isSoundEffectsEnabled } = this.props.settings;
    const keyOS = isMacOS() ? 'Cmd' : 'Ctrl';

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.general.legend.sending">
          <RadioGroup name="sendBy" value={sendBy} onChange={this.handleSendByChange}>
            <Field>
              <Radio value="enter" id="preferences_general_send_by_enter">
                <Text id="PreferencesModal.general.sendByEnter.enable" values={{ keyOS }} html />
              </Radio>
            </Field>
            <Field>
              <Radio value="shift_enter" id="preferences_general_send_by_shift_enter">
                <Text id="PreferencesModal.general.sendByEnter.disable" values={{ keyOS }} html />
              </Radio>
            </Field>
          </RadioGroup>
        </Fieldset>
        <Fieldset legend="PreferencesModal.general.legend.other">
          <Field>
            <Switcher
              id="preferences_general_is_sound_enabled"
              name="isSoundEnabled"
              label="PreferencesModal.general.sound"
              value={isSoundEffectsEnabled}
              onChange={this.handleSoundChange}
            />
          </Field>
          <Field>
            <Switcher
              id="preferences_general_is_debug_enabled"
              name="isDebugEnabled"
              label="PreferencesModal.general.debug.label"
              hint="PreferencesModal.general.debug.hint"
              value={isDebugEnabled}
              onChange={this.handleDebugChange}
            />
          </Field>
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesGeneral;
