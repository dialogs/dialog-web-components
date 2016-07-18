/* eslint react/require-optimization:0 */

import React from 'react';
import styles from './ButtonSpinner.css';

function ButtonSpinner() {
  return (
    <div className={styles.spinner}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

export default ButtonSpinner;
