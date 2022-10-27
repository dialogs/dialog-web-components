/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type MenuItem = {
  title: string,
  handler: () => void
};

export type Props = {
  className?: string,
  children?: any,
  getMenu: () => MenuItem[]
};

