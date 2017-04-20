/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type SidebarFooterButtonVariant = {
  id: string,
  title: string,
  glyph: string,
  pending: boolean,
  counter: number
};

export type Props = {
  className?: string,
  current: string,
  variants: SidebarFooterButtonVariant[],
  onPick: (current: string) => any,
  isUpdateAvailable: boolean,
  onUpdate: () => mixed
};
