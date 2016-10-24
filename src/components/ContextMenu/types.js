/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type MenuItem = {
  title: string,
  handler: () => void
};

export type Props = {
  className?: string,
  children: any,
  menu: MenuItem[]
};

