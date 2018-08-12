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

export type Props = {
  className?: string,
  dialNumber?: string,
  handlePadButtonClick?: (phoneNumber: string) => mixed,
  handleDeleteClick?: (phoneNumber: string) => mixed,
  handleCallClick?: (phoneNumber: string) => mixed,
  handleInputChange?: () => mixed
};

class Dialpad extends PureComponent<Props> {

  onDeleteClick = (): void => {
    const { handleDeleteClick, dialNumber } = this.props;

    if(handleDeleteClick && dialNumber) {
      handleDeleteClick(dialNumber)
    }
    //this.props.handleDeleteClick(this.props.dialNumber)
  };

  onCallClick = (): void => {
    const { handleCallClick, dialNumber } = this.props;

    if(handleCallClick && dialNumber) {
      handleCallClick(dialNumber)
    }
    //this.props.handleCallClick(this.props.dialNumber);
  };

  renderPad() {
    const {dialNumber, handleInputChange, handlePadButtonClick} = this.props;

    return(
      <div className={styles.dialpad}>
        <PadNumber
          dialNumber={dialNumber}
          onInputChange={handleInputChange}
        />
        <Pad
          onPadButtonClick={handlePadButtonClick}
        />
        <PadFooter
          onDeleteClick={this.onDeleteClick}
          onCallClick={this.onCallClick}
        />
      </div>
    )
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderPad()}
      </div>
    );
  }
};

export default Dialpad;
