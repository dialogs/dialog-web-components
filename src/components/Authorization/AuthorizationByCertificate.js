/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { CertValue, InputState } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './Authorization.css';

export type Props = {
  id: string,
  errors: ?{ [field: string]: AuthError }
};

class AuthorizationByCertificate extends PureComponent<Props> {
  render() {
    return (
      <div className={styles.formWrapper} />
    );
  }
}

export default AuthorizationByCertificate;
