/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Text.css';

export type TextProps = {
  text: string,
  service?: boolean
};

function Text(props: TextProps) {
  const className = classNames(styles.root, {
    [styles.service]: props.service
  });

  return (
    <p className={className}>
      {props.text}
    </p>
  );
}

export default Text;
