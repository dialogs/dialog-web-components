/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import styles from './FakeRecentItem.css';
import randomIntFromInterval from '../../utils/randomIntFromInterval';

class FakeRecentItem extends Component {
  renderAvatar() {
    return (
      <div className={styles.avatar} />
    );
  }

  renderText() {
    const lineStyle = {
      width: randomIntFromInterval(90, 160)
    };

    return (
      <div className={styles.text}>
        <div className={styles.line} style={lineStyle} />
      </div>
    );
  }

  renderCounter() {
    if (randomIntFromInterval(0, 1)) {
      return null;
    }

    return (
      <div className={styles.counter} />
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderAvatar()}
        {this.renderText()}
        {this.renderCounter()}
      </div>
    );
  }
}

export default FakeRecentItem;
