/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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
  isSoundEffectsEnabled: boolean
};

export type Props = {
  settings: Settings,
  onChange: (settings: $Shape<Settings>) => any
};

class PreferencesGeneral extends PureComponent {
  props: Props;

  handleSendByChange = (value: string): void => {
    this.props.onChange({
      isSendByEnter: value === 'enter'
    });
  };

  handleSoundChange = (value: boolean): void => {
    this.props.onChange({
      isSoundEffectsEnabled: value
    });
  };

  render() {
    const sendBy = this.props.settings.isSendByEnter ? 'enter' : 'shift_enter';
    const { isSoundEffectsEnabled } = this.props.settings;
    const keyOS = isMacOS() ? 'Cmd' : 'Ctrl';

    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.general.legend.sending">
          <RadioGroup
            name="sendBy"
            value={sendBy}
            onChange={this.handleSendByChange}
          >
            <Field>
              <Radio value="enter">
                <Text id="PreferencesModal.general.sendByEnter.enable" values={{ keyOS }} html />
              </Radio>
            </Field>
            <Field>
              <Radio value="shift_enter">
                <Text id="PreferencesModal.general.sendByEnter.disable" values={{ keyOS }} html />
              </Radio>
            </Field>
          </RadioGroup>
        </Fieldset>
        <Fieldset legend="PreferencesModal.general.legend.other">
          <Field>
            <Switcher
              id="isSoundEnabled"
              name="isSoundEnabled"
              value={isSoundEffectsEnabled}
              onChange={this.handleSoundChange}
            >
              <Text id="PreferencesModal.general.sound" />
            </Switcher>
          </Field>
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesGeneral;
