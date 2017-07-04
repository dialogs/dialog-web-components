/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Spinner from '../Spinner/Spinner';
import Tooltip from '../Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import styles from './ActivityListMembers.css';
import errorToString from '../../utils/errorToString';

export type Props = {
  error: ?(Error | string),
  pending: boolean,
  onClick: (event: SyntheticMouseEvent) => void
};

function ActivityListMembersKick(props: Props) {
  if (props.pending) {
    return (
      <Spinner type="round" className={styles.kickMemberPending} />
    );
  }

  const error = errorToString(props.error);

  if (error) {
    return (
      <Tooltip
        text={error}
        options={{
          attachment: 'middle right',
          targetAttachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together'
            }
          ]
        }}
      >
        <Icon glyph="error" className={styles.kickMemberError} onClick={props.onClick} />
      </Tooltip>
    );
  }


  return (
    <div className={styles.kickMember} onClick={props.onClick}>
      <Text id="ActivityListMembers.kick" />
    </div>
  );
}

export default ActivityListMembersKick;
