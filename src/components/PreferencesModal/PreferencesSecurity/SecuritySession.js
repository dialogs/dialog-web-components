/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthSession } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import styles from './Security.css';

export type Props = {
  session: AuthSession,
  onSessionTerminate?: (id: number) => void
}

class Session extends PureComponent {
  props: Props;

  handleTerminateClick: () => void;

  constructor(props: Props) {
    super(props);

    this.handleTerminateClick = this.handleTerminateClick.bind(this);
  }

  handleTerminateClick(): void {
    const { session } = this.props;

    if (this.props.onSessionTerminate) {
      this.props.onSessionTerminate(session.id);
    }
  }

  renderTerminateButton(): ?React.Element<any> {
    if (!this.props.onSessionTerminate) {
      return null;
    }

    return (
      <Button
        size="small"
        theme="danger"
        onClick={this.handleTerminateClick}
        className={styles.terminateButton}
      >
        <Text id="PreferencesModal.security.terminate" />
      </Button>
    );
  }

  render(): React.Element<any> {
    const { session } = this.props;

    return (
      <Field className={styles.session}>
        <div className={styles.sessionMeta}>
          <div className={styles.sessionTitle}>{session.appTitle}</div>
          <div className={styles.sessionAuthTime}>{session.authTime.toString()}</div>
        </div>
        {this.renderTerminateButton()}
      </Field>
    );
  }
}

export default Session;
