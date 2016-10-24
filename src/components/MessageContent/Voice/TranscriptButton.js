/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Icon from '../../Icon/Icon';
import styles from './Voice.css';

export type TransctiptButtonProps = {
  className?: string,
  onClick?: (event: SyntheticMouseEvent) => any
};

function TransctiptButton({ onClick, className }: TransctiptButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      <Icon glyph="logo" className={styles.transctiptButtonIcon} />
      <div className={styles.transcriptButtonText}>Convert</div>
    </button>
  );
}

export default TransctiptButton;
