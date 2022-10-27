/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import { filterByQuery } from '@dlghq/dialog-utils';
import Fieldset from '../../Fieldset/Fieldset';
import SearchInput from './SearchInput';
import BlockedUser from './BlockedUser';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Blocked.css';

export type Props = {
  blocked: User[],
  onUnblockUser: (id: number) => void
};

export type State = {
  query: string
}

class PreferencesSecurity extends PureComponent {
  props: Props;
  state: State;

  handleQueryChange: (value: string) => void;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(query: string): void {
    this.setState({ query });
  }

  renderSearchInput(): ?React.Element<any> {
    const { blocked } = this.props;
    const { l10n } = this.context;

    if (!blocked.length) {
      return null;
    }

    return (
      <SearchInput
        onChange={this.handleQueryChange}
        placeholder={l10n.formatText('PreferencesModal.blocked.search_placeholder')}
      />
    );
  }

  renderBlockedUsers(): React.Element<any>[] {
    const { blocked } = this.props;
    const { query } = this.state;

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

    const filtered = filterByQuery(query, blocked, (user) => user.name);

    if (!filtered.length) {
      return [
        <Text
          key="not_found"
          id="PreferencesModal.blocked.not_found"
          className={styles.notFound}
          tagName="div"
        />
      ];
    }

    return filtered.map((user) => {
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
          {this.renderSearchInput()}
          {this.renderBlockedUsers()}
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesSecurity;
