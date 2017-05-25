/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import CallInfoState from './CallInfoState';
import styles from './CallInfo.css';

type Props = {
  className?: string,
  call: Call,
  onCall: boolean,
  withVideo: boolean,
  onClick?: () => mixed
};

class CallInfo extends PureComponent {
  props: Props;

  render() {
    const { call } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.onCall]: this.props.onCall,
      [styles.withVideo]: this.props.withVideo
    });

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <div className={styles.caller}>
            <PeerInfoTitle title={call.peer.title} onTitleClick={this.props.onClick} />
          </div>
          <div className={styles.state}>
            <CallInfoState
              state={call.state}
              startTime={call.startTime}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CallInfo;
