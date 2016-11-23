/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Spinner from '../Spinner/Spinner';
import Tooltip from '../Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import styles from './ActivityListMembers.css';

export type Props = {
  error: ?string,
  pending: boolean,
  onClick: () => void
};

function ActivityListMembersKick(props: Props) {
  if (props.pending) {
    return (
      <Spinner type="round" className={styles.kickMemberPending} />
    );
  }

  if (props.error) {
    return (
      <Tooltip
        text={props.error}
        options={{
          attachment: 'middle right',
          targetAttachment: 'middle left'
        }}
      >
        <Icon glyph="error" className={styles.kickMemberError} />
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
