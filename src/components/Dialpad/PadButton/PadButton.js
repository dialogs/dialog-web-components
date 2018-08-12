/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import CustomButton from './../../CustomButton/CustomButton';
import classNames from 'classnames';
import styles from './PadButton.css';

export type Props = {
  className?: string,
  value?: string,
  key?: string,
  onClick?: () => mixed
};

class PadButton extends PureComponent<Props> {

  render() {
    const className = classNames(styles.wrapper, this.props.className);
    const { value, onClick } = this.props

    if(onClick) {
      return (
        <div className={className}>
          <CustomButton 
          size='large' 
          value={value ? value.toUpperCase() : null} 
          onClick={onClick} 
          className={styles.containerButton}
          glyph={null}
          />
        </div>
      );
    }
  }
}

export default PadButton;
