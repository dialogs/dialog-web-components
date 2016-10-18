/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../Fieldset/Fieldset';
import Field from '../Field/Field';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import Switcher from '../Switcher/Switcher';
import styles from './PreferencesModal.css';

export type Settings = {
  isSendByEnter: boolean,
  isSoundEffectsEnabled: boolean
};

export type Props = {
  settings: Settings,
  onChange: (settings: Settings) => any
};

class PreferencesGeneral extends PureComponent {
  props: Props;

  handleSendByChange: Function;
  handleSoundChange: Function;

  constructor(props: Props) {
    super(props);

    this.handleSendByChange = this.handleSendByChange.bind(this);
    this.handleSoundChange = this.handleSoundChange.bind(this);
  }

  handleSendByChange(value: string): void {
    this.props.onChange({
      ...this.props.settings,
      isSendByEnter: value === 'enter'
    });
  }

  handleSoundChange(value: boolean): void {
    this.props.onChange({
      ...this.props.settings,
      isSoundEffectsEnabled: value
    });
  }

  render() {
    const sendBy = this.props.settings.isSendByEnter ? 'enter' : 'shift_enter';
    const isSoundEffectsEnabled = this.props.settings.isSoundEffectsEnabled;

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
                <Text id="PreferencesModal.general.sendByEnter.enable" html />
              </Radio>
            </Field>
            <Field>
              <Radio value="shift_enter">
                <Text id="PreferencesModal.general.sendByEnter.disable" html />
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
