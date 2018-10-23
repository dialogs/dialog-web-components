/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Context } from 'react';

export type RadioGroupContextType = {
  value: string,
  name: ?string,
  onChange: (value: string, event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  disabled: boolean
};

export const RadioGroupContext: Context<?RadioGroupContextType> = React.createContext();
