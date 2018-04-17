/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import BaseInput, { type Props } from './BaseInput';

function PasswordWidget(props: Props) {
  return <BaseInput {...props} type="password" autoComplete="off" />;
}

export default PasswordWidget;
