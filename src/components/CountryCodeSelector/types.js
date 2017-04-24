/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { LocalizationContext } from '@dlghq/react-l10n';

export type Country = {
  alpha: string,
  code: string,
  flag: ?string
};

export type Context = {
  l10n: LocalizationContext
};

export type Props = {
  className?: string,
  value: ?Country,
  label: ?string,
  disabled: boolean,
  onChange: (value: Country) => void
};
