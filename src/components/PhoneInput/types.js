/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../CountryCodeSelector/types';

export type Props = {
  value: string,
  onChange: (value: string, country: ?Country) => any,
  className?: string,
  id: string,
  name?: string,
  label?: string,
  large?: boolean,
  placeholder?: string,
  disabled?: bool,
  hint?: string,
  status: 'normal' | 'success' | 'error',
  autoFocus?: boolean,
  tabIndex?: number,
};
