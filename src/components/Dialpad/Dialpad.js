/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Dialpad.css';
import Pad from './Pad/Pad';
import PadNumber from './PadNumber/PadNumber';
import PadFooter from './PadFooter/PadFooter';

type Props = {
  className?: string,
  number: string,
  onChange: (number: string) => mixed,
  onSubmit: (number: string) => mixed,
  onFocus: () => mixed,
  onBlur: () => mixed,
};

class Dialpad extends PureComponent<Props> {
  handleCall = () => {
    this.props.onSubmit(this.props.number);
  };

  handleButtonClick = (value: string) => {
    this.props.onChange(this.props.number + value);
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.dialpad}>
          <PadNumber
            number={this.props.number}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Pad onPress={this.handleButtonClick} />
          <PadFooter onCallClick={this.handleCall} />
        </div>
      </div>
    );
  }
}

export default Dialpad;
