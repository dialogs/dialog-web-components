/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './MessageState.css';

function MessageError() {
  return (
    <Text id="MessageState.error" className={styles.error} tagName="div" />
  );
}

export default MessageError;
