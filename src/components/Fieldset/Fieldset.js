/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Fieldset.css';

type Props = {
  className?: string,
  legend: string,
  children?: mixed
};

function Fieldset(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <fieldset className={className}>
      <Text id={props.legend} className={styles.legend} tagName="legend" />
      {props.children}
    </fieldset>
  );
}

export default Fieldset;
