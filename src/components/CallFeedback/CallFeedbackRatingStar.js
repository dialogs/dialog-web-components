/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './CallFeedback.css';

type Props = {
  value: number,
  active: boolean,
  onChange: (value: number) => any
};

class CallFeedbackRatingStar extends PureComponent {
  props: Props;

  handleChange = (): void => {
    this.props.onChange(this.props.value);
  };

  render() {
    const { active } = this.props;
    const className = classNames(styles.star, {
      [styles.starActive]: active
    });
    const glyph = active ? 'star' : 'star_outline';

    return (
      <Icon
        className={className}
        glyph={glyph}
        size={40}
        onClick={this.handleChange}
      />
    );
  }
}

export default CallFeedbackRatingStar;
