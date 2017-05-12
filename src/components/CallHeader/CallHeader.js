/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props as CallInfoProps } from '../CallInfo/CallInfo';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import isOnCall from '../Call/utils/isOnCall';
import styles from './CallHeader.css';

export type Props = CallInfoProps & {
  isVisible: boolean,
};

class CallHeader extends PureComponent {
  props: Props;

  render() {
    const { caller, call, duration, isVisible } = this.props;
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.onCall]: this.props.onCall
    }, this.props.className);
    const onCall = isOnCall(call.state);

    return (
      <header className={className}>
        <CallAvatar
          caller={caller}
          size={40}
          animated={!onCall}
        />
        <CallInfo
          onCall={onCall}
          className={styles.info}
          call={call}
          caller={caller}
          duration={duration}
        />
      </header>
    );
  }
}

export default CallHeader;
