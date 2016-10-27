/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import Fieldset from '../../Fieldset/Fieldset';
import BlockedUser from './BlockedUser';
import styles from '../PreferencesModal.css';

export type Props = {
  blocked: User[],
  onUnblockUser: (id: number) => void
};

class PreferencesSecurity extends PureComponent {
  props: Props;

  renderBlockedUsers(): React.Element<any>[] {
    const { blocked } = this.props;

    return blocked.map((user) => {
      return (
        <BlockedUser
          key={user.id}
          user={user}
          onUnblockUser={this.props.onUnblockUser}
        />
      );
    });
  }

  render(): React.Element<any> {
    return (
      <div className={styles.screen}>
        <Fieldset legend="PreferencesModal.blocked.legend">
          {this.renderBlockedUsers()}
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesSecurity;
