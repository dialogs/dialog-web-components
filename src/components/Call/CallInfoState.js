/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfoStateProps } from './types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import { formatTime } from '@dlghq/dialog-utils';

function CallInfoState(props: CallInfoStateProps): React.Element<any> {
  switch (props.state) {
    case 'calling':
      if (props.isOutgoing) {
        return (
          <Text id="Call.calling_in" />
        );
      }

      return (
        <Text id="Call.calling_out" />
      );

    case 'connecting':
      return (
        <Text id="Call.connecting" />
      );

    case 'in_progress':
      return (
        <span>
          {formatTime(props.duration)}
        </span>
      );

    case 'ended':
      return (
        <Text id="Call.ended" />
      );

    default:
      // eslint-disable-next-line
      (props.state: null);
      return (
        <Text id="Call.unknown" />
      );
  }
}

export default CallInfoState;
