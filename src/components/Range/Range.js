/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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
  onChange: (value: number) => any
};

class Range extends PureComponent {
  props: Props;

  static defaultProps = {
    orientation: 'horizontal'
  };

  render(): React.Element<any> {
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
