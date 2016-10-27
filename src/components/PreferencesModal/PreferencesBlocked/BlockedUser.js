/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import PeerAvatar from '../../PeerAvatar/PeerAvatar';
import styles from './Blocked.css';

export type Props = {
  user: User,
  onUnblockUser: (id: number) => void
};

class BlockedUser extends PureComponent {
  props: Props;

  handleUnblock: () => void;

  constructor(props: Props) {
    super(props);

    this.handleUnblock = this.handleUnblock.bind(this);
  }

  handleUnblock(): void {
    this.props.onUnblockUser(this.props.user.id);
  }

  render(): React.Element<any> {
    const { user } = this.props;
    const avatarPeer = {
      title: user.name,
      avatar: user.avatar,
      placeholder: user.placeholder
    };

    return (
      <Field className={styles.user}>
        <div className={styles.userMeta}>
          <PeerAvatar
            size="large"
            className={styles.userAvatar}
            peer={avatarPeer}
          />
          <span className={styles.userName}>{user.name}</span>
          {
            user.nick
              ? <span className={styles.userNick}>@{user.nick}</span>
              : null
          }
        </div>

        <Button
          theme="danger"
          size="small"
          onClick={this.handleUnblock}
          className={styles.unblockButton}
        >
          <Text id="PreferencesModal.blocked.unblock" />
        </Button>
      </Field>
    );
  }
}

export default BlockedUser;
