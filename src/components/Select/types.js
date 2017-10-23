/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type Option = {
  value: string,
  title: string
};

export type Props = {
  className?: string,
  wrapperClassName?: string,
  id: string,
  name?: string,
  value?: string,
  defaultValue?: ?string,
  disabled?: boolean,
  label?: string,
  theme: 'default' | 'primary' | 'success' | 'danger' | 'info' | 'warning',
  size: 'small' | 'normal',
  options: Option[],
  placeholder?: string,
  onChange: (value: string) => any
};
