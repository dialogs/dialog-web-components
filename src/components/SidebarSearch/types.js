/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type SidebarSearchProps = {
  className?: string,
  value: string,
  isFocused: boolean,
  onChange: (value: string) => any,
  onFocus: () => any,
  onBlur: () => any
};
