import React from 'react';
import Spinner from '../../Spinner/Spinner';
import styles from './MessageState.css';

function MessageSending() {
  return (
    <Spinner type="round" className={styles.sending} />
  );
}

export default MessageSending;
