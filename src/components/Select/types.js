/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';

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
  theme: ColorTheme,
  size: 'small' | 'normal',
  options: Option[],
  placeholder?: string,
  onChange: (value: string) => mixed
};
