/**
 * Copyright 2018 dialog LLC <info@dlg.im>
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
  onSessionTerminate?: (id: number) => mixed
}

class Session extends PureComponent<Props> {
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

  renderTerminateButton() {
    if (!this.props.onSessionTerminate) {
      return null;
    }

    return (
      <Button
        size="small"
        theme="danger"
        onClick={this.handleTerminateClick}
        className={styles.terminateButton}
        id={`preferences_security_terminate_${this.props.session.id}_button`}
      >
        <Text id="PreferencesModal.security.terminate" />
      </Button>
    );
  }

  render() {
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
