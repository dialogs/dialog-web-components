/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import React from 'react';
import styles from './FakeMessage.css';
import { random } from 'lodash';

function FakeMessage() {
  function renderText() {
    const linesCount = random(2, 6);
    const linesArray = [];

    for (let i = 1; i <= linesCount; i++) {
      linesArray.push(random(50, 420));
    }

    return linesArray.map((lineWidth, index) => (
      <div
        key={index}
        className={styles.line}
        style={{ width: lineWidth }}
      />
    ));
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar} />
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.lineHeader} style={{ width: 136 }} />
          <div className={styles.lineHeader} style={{ width: 50 }} />
        </header>
        <div className={styles.text}>
          {renderText()}
        </div>
      </div>
    </div>
  );
}

export default FakeMessage;
