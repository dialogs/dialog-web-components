/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfoProps } from './types';
import React from 'react';
import classNames from 'classnames';
import CallInfoState from './CallInfoState';
import styles from './CallInfo.css';

function CallInfo(props: CallInfoProps): React.Element<any> {
  const className = classNames(styles.container, {
    [styles.small]: props.small
  });

  return (
    <div className={className}>
      <div className={styles.caller}>
        {props.caller.name}
      </div>
      <div className={styles.state}>
        <CallInfoState
          state={props.call.state}
          duration={props.duration}
        />
      </div>
    </div>
  );
}

export default CallInfo;
