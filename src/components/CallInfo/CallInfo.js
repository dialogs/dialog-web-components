/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../Call/Call.css';

export type Props = {
  className?: string,
  small: boolean,
  state: CallState,
  call: {
    caller: {
      title: string,
      avatar: string,
      placeholder: string,
    },
    duration: ?string
  }
};

class CallInfo extends Component {
  prosp: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.className !== this.props.className ||
           nextProps.small !== this.props.small;
  }

  render(): React.Element<any> {
    const { call: { caller, duration }, small } = this.props;
    const className = classNames(styles.info, {
      [styles.smallInfo]: small
    }, this.props.className);

    return (
      <div className={className}>
        <div className={styles.infoCaller}>{caller.title}</div>
        <div className={styles.infoState}>{duration}</div>
      </div>
    );
  }
}

export default CallInfo;
