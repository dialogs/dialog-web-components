/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, User } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import CallInfoState from './CallInfoState';
import styles from './CallInfo.css';

export type Props = {
  className?: string,
  call: Call,
  caller: User,
  onCall: boolean,
  withVideo: boolean
};

function CallInfo(props: Props): React.Element<any> {
  const className = classNames(styles.container, {
    [styles.onCall]: props.onCall,
    [styles.withVideo]: props.withVideo
  }, props.className);

  return (
    <div className={className}>
      <div className={styles.caller}>
        {props.caller.name}
      </div>
      <div className={styles.state}>
        <CallInfoState
          state={props.call.state}
          startTime={props.call.startTime}
        />
      </div>
    </div>
  );
}

export default CallInfo;
