/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './MessageState.css';

function MessageSent() {
  return (
    <div className={styles.sent}>
      <div className={styles.dot} />
      &nbsp;
      <Text id="MessageState.sent" className={styles.error} />
    </div>
  );
}

export default MessageSent;
