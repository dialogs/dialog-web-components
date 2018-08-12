/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Pad.css';
import PadButton from '../PadButton/PadButton';

export type Props = {
  className?: string,
  onPadButtonClick?: (phoneNumber: string) => mixed
};

class Pad extends PureComponent<Props> {

  renderButtons = (): any => {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
    const { onPadButtonClick } = this.props;

    if(onPadButtonClick) {
      return buttons.map(element => 
        <PadButton 
          value={element} 
          onClick={()=> onPadButtonClick(element)} 
          key={'test__'+element}
        />)
    }
  };

  render() {
    const className = classNames(styles.container, this.props.className);


    return (
      <div className={className}>
        <div className={classNames(styles.buttons)}>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default Pad;
