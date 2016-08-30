import React from 'react';
import styles from './MessageState.css';

function MessageSent() {
  return (
    <div className={styles.sent}>
      <div className={styles.dot} /> Sent
    </div>
  );
}

export default MessageSent;
