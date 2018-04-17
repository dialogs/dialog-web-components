/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Fieldset.css';

type Props = {
  className?: string,
  legend?: ?string,
  children: React.Node
};

function Fieldset(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <fieldset className={className}>
      {props.legend ? <Text id={props.legend} className={styles.legend} tagName="legend" /> : null}
      {props.children}
    </fieldset>
  );
}

export default Fieldset;
