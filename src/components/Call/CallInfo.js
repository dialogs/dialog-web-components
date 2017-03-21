/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfoProps } from './types';
import React from 'react';
import classNames from 'classnames';
import CallInfoState from './CallInfoState';
import styles from './Call.css';

function CallInfo(props: CallInfoProps): React.Element<any> {
  const className = classNames(styles.info, {
    [styles.smallInfo]: props.small
  });

  return (
    <div className={className}>
      <div className={styles.infoCaller}>
        {props.caller.name}
      </div>
      <div className={styles.infoState}>
        <CallInfoState
          state={props.call.state}
          duration={props.duration}
        />
      </div>
    </div>
  );
}

export default CallInfo;
