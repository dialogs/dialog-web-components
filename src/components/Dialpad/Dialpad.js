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

  handleBackspace = (): void => {
    const { phone } = this.props;
    this.props.onChange(phone.slice(0, Math.max(0, phone.length - 1)));
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.dialpad}>
          <PadNumber
            phone={this.props.phone}
            onChange={this.props.onChange}
          />
          <Pad onPress={this.handlePress} />
          <PadFooter
            onCallClick={this.handleCall}
            onDeleteClick={this.handleBackspace}
          />
        </div>
      </div>
    );
  }
};

export default Dialpad;
