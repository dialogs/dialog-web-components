/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { CallAvatarProps } from './types';
import React from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './CallAvatar.css';

function CallAvatar(props: CallAvatarProps): React.Element<any> {
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
