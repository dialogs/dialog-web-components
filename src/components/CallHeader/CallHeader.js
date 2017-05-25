/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import isOnCall from '../Call/utils/isOnCall';
import styles from './CallHeader.css';

type Props = {
  call: Call,
  isVisible: boolean,
  withVideo: boolean,
  onClick?: () => mixed
};

class CallHeader extends PureComponent {
  props: Props;

  render() {
    const { call, isVisible, withVideo } = this.props;
    const onCall = isOnCall(call.state);
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.withVideo]: withVideo
    });

    return (
      <header className={className}>
        <CallAvatar
          peer={call.peer}
          size={withVideo ? 40 : 50}
          animated={!onCall}
          onClick={this.props.onClick}
        />
        <CallInfo
          className={styles.info}
          call={call}
          onCall={onCall}
          withVideo={withVideo}
          onClick={this.props.onClick}
        />
      </header>
    );
  }
}

export default CallHeader;
