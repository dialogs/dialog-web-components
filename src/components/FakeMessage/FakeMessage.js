/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import styles from './FakeMessage.css';
import { random } from 'lodash';

class FakeMessage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  renderText() {
    const linesCount = random(5, 15);
    const linesArray = [];

    for (let i = 1; i <= linesCount; i++) {
      linesArray.push(random(50, 300));
    }

    return linesArray.map((lineWidth) => {
      return (
        <div className={styles.line} style={{width: lineWidth}} />

      );
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.avatar} />
        <div className={styles.body}>
          <header className={styles.header}>
            <div className={styles.line} style={{width: 136}} />
            <div className={styles.line} style={{width: 49}} />
          </header>
          <div className={styles.text}>
            {this.renderText()}
          </div>
        </div>
      </div>
    );
  }
}

export default FakeMessage;
