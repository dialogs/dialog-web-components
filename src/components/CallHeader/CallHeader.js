/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import isOnCall from '../Call/utils/isOnCall';
import styles from './CallHeader.css';

export type Props = {
  call: Call,
  caller: User,
  isVisible: boolean,
  withVideo: boolean
};

class CallHeader extends PureComponent {
  props: Props;

  render() {
    const { caller, call, isVisible, withVideo } = this.props;
    const onCall = isOnCall(call.state);
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.withVideo]: withVideo
    });

    return (
      <header className={className}>
        <CallAvatar
          caller={caller}
          size={withVideo ? 40 : 50}
          animated={!onCall}
        />
        <CallInfo
          withVideo={withVideo}
          onCall={onCall}
          className={styles.info}
          call={call}
          caller={caller}
        />
      </header>
    );
  }
}

export default CallHeader;
