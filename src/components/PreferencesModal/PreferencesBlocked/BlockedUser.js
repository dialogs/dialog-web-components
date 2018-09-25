/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import Avatar from '../../Avatar/Avatar';
import styles from './Blocked.css';

export type Props = {
  user: User,
  onUnblockUser: (id: number) => mixed
};

class BlockedUser extends PureComponent<Props> {
  handleUnblock: () => void;

  constructor(props: Props) {
    super(props);

    this.handleUnblock = this.handleUnblock.bind(this);
  }

  handleUnblock(): void {
    this.props.onUnblockUser(this.props.user.id);
  }

  render() {
    const { user } = this.props;

    return (
      <Field className={styles.user}>
        <div className={styles.userMeta}>
          <Avatar
            className={styles.userAvatar}
            size={40}
            title={user.name}
            image={user.avatar}
            placeholder={user.placeholder}
          />
          <div className={styles.userInfo}>
            <p className={styles.userName}>
              {user.name}
            </p>
            {user.nick && (
              <p className={styles.userNick}>
                {`@${user.nick}`}
              </p>
            )}
          </div>
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
