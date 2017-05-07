/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { CallState, User } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './CallAvatar.css';

export type Props = {
  small: boolean,
  state: CallState,
  caller: User
};

function CallAvatar(props: Props): React.Element<any> {
  const className = classNames(styles.container, styles[props.state]);

  return (
    <div className={className}>
      <Avatar
        size={props.small ? 30 : 50}
        image={props.caller.avatar}
        title={props.caller.name}
        placeholder={props.caller.placeholder}
      />
    </div>
  );
}

export default CallAvatar;
