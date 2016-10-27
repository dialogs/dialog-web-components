/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../../Fieldset/Fieldset';
import BlockedUser from './BlockedUser';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Blocked.css';

export type Props = {
  blocked: User[],
  onUnblockUser: (id: number) => void
};

class PreferencesSecurity extends PureComponent {
  props: Props;

  renderBlockedUsers(): React.Element<any>[] {
    const { blocked } = this.props;

    if (!blocked.length) {
      return [
        <Text
          key="empty"
          id="PreferencesModal.blocked.empty"
          className={styles.empty}
          tagName="div"
        />
      ];
    }

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
      <div className={preferencesStyles.screen}>
        <Fieldset legend="PreferencesModal.blocked.legend">
          {this.renderBlockedUsers()}
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesSecurity;
