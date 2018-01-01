/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

export type MenuItem = {
  title: string,
  handler: () => void
};

export type Props = {
  className?: string,
  children?: mixed,
  getMenu: () => MenuItem[]
};

