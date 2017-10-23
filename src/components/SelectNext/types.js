/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type Option = {
  value: string,
  title: string
};

export type SelectOption = {
  value: string,
  label: string
};

export type Props = {
  className?: string,
  id: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  clearable?: boolean,
  searchable?: boolean,
  multi?: boolean,
  label?: string,
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning',
  size: 'small' | 'normal',
  options: Option[],
  placeholder?: string,
  onChange: (value: string) => any
};
