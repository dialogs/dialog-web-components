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
  phone: string,
  onChange: (phone: string) => mixed,
  onSubmit: (phone: string) => mixed
};

class Dialpad extends PureComponent<Props> {
  handleCall = () => {
    this.props.onSubmit(this.props.phone);
  };

  handlePress = (value: string) => {
    this.props.onChange(this.props.phone + value);
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.dialpad}>
          <PadNumber phone={this.props.phone} onChange={this.props.onChange} />
          <Pad onPress={this.handlePress} />
          <PadFooter onCallClick={this.handleCall} />
        </div>
      </div>
    );
  }
}

export default Dialpad;
