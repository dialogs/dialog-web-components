/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps } from './types';
import React from 'react';
import BigCall from './BigCall';
import SmallCall from './SmallCall';

function Call(props: CallWrapperProps): ?React.Element<any> {
  const { call, caller } = props;
  if (!call || !caller) {
    return null;
  }

  const ChildCall = props.small ? SmallCall : BigCall;

  return (
    <ChildCall
      call={call}
      caller={caller}
      duration={props.duration}
      onEnd={props.onEnd}
      onSizeToggle={props.onSizeToggle}
      onMuteToggle={props.onMuteToggle}
    />
  );
}

export default Call;
