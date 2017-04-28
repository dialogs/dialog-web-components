/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type Country = {
  alpha: string,
  code: string,
  flag: ?string
};

export type Props = {
  className?: string,
  value: ?Country,
  countries: Country[],
  label: ?string,
  disabled: boolean,
  onChange: (value: Country) => void
};
