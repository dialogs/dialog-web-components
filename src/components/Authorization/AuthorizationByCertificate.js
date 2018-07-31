/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Error from '../Error/Error';
import styles from './Authorization.css';

export type Props = {
  id: string,
  errors: ?{ [field: string]: AuthError }
};

class AuthorizationByCertificate extends PureComponent<Props> {
  renderErrors() {
    const { errors } = this.props;

    if (!(errors && errors.cert)) {
      return null;
    }

    return (
      <div className={styles.errorWrapper}>
        <Error>
          <Text id="Authorization.cert_error" html />
        </Error>
      </div>
    );
  }

  render() {
    const { id } = this.props;

    return (
      <div className={styles.formWrapper} id={id}>
        {this.renderErrors()}
      </div>
    );
  }
}

export default AuthorizationByCertificate;
