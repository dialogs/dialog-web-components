/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import CallFeedbackRatingStar from './CallFeedbackRatingStar';
import styles from './CallFeedback.css';

type Props = {
  id: string,
  value: number,
  maxRating: number,
  onChange: (value: number) => any
};

class CallFeedbackRating extends PureComponent {
  props: Props;

  renderStars() {
    const { maxRating, value, id } = this.props;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <CallFeedbackRatingStar
          key={`${id}_star_${i}`}
          value={i}
          active={i <= value}
          onChange={this.props.onChange}
        />
      );
    }

    return stars;
  }

  render() {
    return (
      <div className={styles.rating}>
        {this.renderStars()}
      </div>
    );
  }
}

export default CallFeedbackRating;
