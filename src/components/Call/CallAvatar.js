/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import type { CallAvatarProps } from './types';
import React from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import styles from './Call.css';

function CallAvatar(props: CallAvatarProps): React.Element<any> {
  const className = classNames(styles.avatar, styles[props.state]);

  return (
    <div className={className}>
      <Avatar
        size="super"
        image={props.caller.avatar}
        title={props.caller.name}
        placeholder={props.caller.placeholder}
      />
    </div>
  );
}

export default CallAvatar;
