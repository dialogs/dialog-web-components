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
  id: string,
  name?: string,
  value: string,
  disabled?: boolean,
  label?: string,
  options: Option[],
  placeholder?: string,
  onChange: (value: string) => any
};
