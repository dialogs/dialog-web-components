/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps } from './types';
import React from 'react';
import { isSamePeer } from '@dlghq/dialog-types/utils';
import BigCall from './BigCall';
import SmallCall from './SmallCall';

function Call(props: CallWrapperProps): ?React.Element<any> {
  const { call } = props;
  if (!call) {
    return null;
  }

  const caller = call.members.find((member) => isSamePeer(call.peer, member.peer));
  if (!caller) {
    return null;
  }

  if (props.small) {
    return (
      <SmallCall
        call={call}
        caller={caller}
        duration={props.duration}
        onEnd={props.onEnd}
        onSizeToggle={props.onSizeToggle}
        onMuteToggle={props.onMuteToggle}
      />
    );
  }

  return (
    <BigCall
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
