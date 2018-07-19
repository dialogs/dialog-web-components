/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

// import type { AuthError } from '@dlghq/dialog-types';
import React from 'react';
import styles from './Authorization.css';

export type Props = {
  id: string,
  // errors: ?{ [field: string]: AuthError }
};

function AuthorizationByCertificate(props: Props) {
  return <div className={styles.formWrapper} id={props.id} />;
}

export default AuthorizationByCertificate;
