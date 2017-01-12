/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './CreateNewModal.css';

export type Props = {
  type: 'group' | 'channel',
  onChange: () => void;
}

function CreateNewType(props: Props) {
  return (
    <div className={styles.type}>
      <RadioGroup name="type" value={props.type} onChange={props.onChange}>
        <Radio value="group">
          <Text id="CreateNewModal.group.type.title" className={styles.typeLabel} />
        </Radio>
        <Text
          className={styles.typeHint}
          id="CreateNewModal.group.type.hint"
          tagName="div"
        />
        <br />
        <Radio value="channel">
          <Text id="CreateNewModal.channel.type.title" className={styles.typeLabel} />
        </Radio>
        <Text
          className={styles.typeHint}
          id="CreateNewModal.channel.type.hint"
          tagName="div"
        />
      </RadioGroup>
    </div>
  );
}

export default CreateNewType;
