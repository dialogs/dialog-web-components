/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Range.css';
import Slider from 'react-rangeslider';

export type Props = {
  className?: string,
  min: number,
  max: number,
  value: number,
  step: number,
  orientation: 'vertical' | 'horizontal',
  onChange: (value: number) => mixed,
};

class Range extends PureComponent<Props> {
  static defaultProps = {
    orientation: 'horizontal',
    min: 0,
    max: 1,
    step: 0.01,
    value: 0,
  };

  render() {
    const { min, max, step, value, orientation } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          orientation={orientation}
          reverse={false}
          tooltip={false}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Range;
