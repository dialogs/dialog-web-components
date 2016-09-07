/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React from 'react';
import styles from './FakeRecentItem.css';
import { random } from 'lodash';

function FakeRecentItem() {
  function renderAvatar() {
    return (
      <div className={styles.avatar} />
    );
  }

  function renderText() {
    const lineStyle = {
      width: random(90, 160)
    };

    return (
      <div className={styles.text}>
        <div className={styles.line} style={lineStyle} />
      </div>
    );
  }

  function renderCounter() {
    if (random(0, 1)) {
      return null;
    }

    return (
      <div className={styles.counter} />
    );
  }

  return (
    <div className={styles.root}>
      {renderAvatar()}
      {renderText()}
      {renderCounter()}
    </div>
  );
}

export default FakeRecentItem;
