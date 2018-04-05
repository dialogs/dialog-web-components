/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthSession } from '@dlghq/dialog-types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType, Text } from '@dlghq/react-l10n';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import getLocalDateTimeFormat from '../../../utils/getLocalDateTimeFormat';
import getDateFnsLocale from '../../../utils/getDateFnsLocale';
import formatDate from 'date-fns/format';
import styles from './Security.css';

export type Props = {
  session: AuthSession,
  onSessionTerminate?: (id: number) => mixed
};

class Session extends PureComponent<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  handleTerminateClick = (): void => {
    const { session } = this.props;

    if (this.props.onSessionTerminate) {
      this.props.onSessionTerminate(session.id);
    }
  };

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

  renderAuthTime() {
    const { session } = this.props;

    const format = getLocalDateTimeFormat(this.context.l10n.locale);
    const locale = getDateFnsLocale(this.context.l10n.locale);

    return (
      <time className={styles.sessionAuthTime} dateTime={session.authTime.toISOString()}>
        {formatDate(session.authTime, format, locale)}
      </time>
    );
  }

  renderDeviceTitle() {
    const { session } = this.props;

    return <div className={styles.sessionDeviceTitle}>{session.deviceTitle}</div>;
  }

  render() {
    const { session } = this.props;

    return (
      <Field className={styles.session}>
        <div className={styles.sessionMeta}>
          <div className={styles.sessionTitle}>{session.appTitle}</div>
          {this.renderAuthTime()}
          {this.renderDeviceTitle()}
        </div>
        {this.renderTerminateButton()}
      </Field>
    );
  }
}

export default Session;
