/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PadFooter.css';
import IconButton from './../../IconButton/IconButton';

export type Props = {
  className?: string,
  onDeleteClick?: () => mixed,
  onCallClick?: () => mixed
};

class PadFooter extends PureComponent<Props> {

  render() {
    const className = classNames(styles.container, this.props.className);
    const { onDeleteClick, onCallClick } = this.props;

    if(onDeleteClick && onCallClick) {
      return (
        <div className={className}>
          <div className={styles.wrapper}>
            <IconButton 
              size='large' 
              theme="success" 
              flat 
              glyph='phone_outline' 
              onClick={onCallClick} 
            />
          </div>
          <div className={styles.wrapper}>
            <IconButton 
              size='large' 
              glyph='keyboard_arrow_left' 
              onClick={onDeleteClick} 
            />
          </div>
        </div>
      );
    }
  }
}

export default PadFooter;
