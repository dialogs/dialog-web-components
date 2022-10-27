/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthSession } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../../Fieldset/Fieldset';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import Session from './SecuritySession';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Security.css';

export type Props = {
  sessions: AuthSession[],
  onSessionTerminate: (id: number) => void,
  onAllSessionsTerminate: () => void
};

class PreferencesSecurity extends PureComponent {
  props: Props;

  renderCurrentSessions(): React.Element<any> {
    const { sessions } = this.props;
    const currentSession = sessions.find((session) => session.holder === 'THIS_DEVICE');

    return (
      <Fieldset legend="PreferencesModal.security.legend.current_session">
        <Session session={currentSession} />
        {this.renderTerminateAllSessions()}
      </Fieldset>
    );
  }

  renderTerminateAllSessions(): ?React.Element<any> {
    const { sessions } = this.props;

    if (sessions.length === 1) {
      return null;
    }

    return (
      <Field>
        <Button
          theme="danger"
          view="link"
          size="small"
          className={styles.termnateAllButton}
          onClick={this.props.onAllSessionsTerminate}
        >
          <Text id="PreferencesModal.security.terminate_all" />
        </Button>
      </Field>
    );
  }

  renderActiveSessions(): ?React.Element<any> {
    const { sessions } = this.props;
    const activeSessions = sessions.filter((session) => session.holder === 'OTHER_DEVICE');

    if (!activeSessions.length) {
      return null;
    }

    const children = activeSessions.map((session) => {
      return (
        <Session
          key={session.id}
          session={session}
          onSessionTerminate={this.props.onSessionTerminate}
        />
      );
    });

    return (
      <Fieldset legend="PreferencesModal.security.legend.active_sessions">
        {children}
      </Fieldset>
    );
  }

  render(): React.Element<any> {
    return (
      <div className={preferencesStyles.screen}>
        {this.renderCurrentSessions()}
        {this.renderActiveSessions()}
      </div>
    );
  }
}

export default PreferencesSecurity;
