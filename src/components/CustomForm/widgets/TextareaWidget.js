/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import BaseInput, { type Props } from './BaseInput';

function TextareaWidget(props: Props) {
  return <BaseInput {...props} type="textarea" />;
}

export default TextareaWidget;
