/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import React from 'react';
import styles from './SidebarFakeItem.css';
import { random } from 'lodash';

function SidebarFakeItem() {
  function renderAvatar() {
    return (
      <div className={styles.avatar} />
    );
  }

  function renderText() {
    return (
      <div className={styles.text}>
        <div className={styles.line} style={{ width: random(60, 120) }} />
        <div className={styles.lineAbout} style={{ width: random(90, 150) }} />
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
    <div className={styles.container}>
      {renderAvatar()}
      {renderText()}
      {renderCounter()}
    </div>
  );
}

export default SidebarFakeItem;
