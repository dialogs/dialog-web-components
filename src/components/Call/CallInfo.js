/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfoProps } from './types';
import React from 'react';
import classNames from 'classnames';
import formatTime from '../../utils/formatTime';
import styles from './Call.css';

function CallInfo(props: CallInfoProps): React.Element<any> {
  const className = classNames(styles.info, {
    [styles.smallInfo]: props.small
  });

  return (
    <div className={className}>
      <div className={styles.infoCaller}>
        {props.caller.title}
      </div>
      <div className={styles.infoState}>
        {formatTime(props.duration)}
      </div>
    </div>
  );
}

export default CallInfo;
