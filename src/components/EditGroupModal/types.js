/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type EditInfo = {
  type: 'group' | 'channel',
  title: string,
  shortname: ?string,
  about: ?string,
  avatar: ?File
};

export type Props = {
  info: EditInfo,
  className?: string,
  onChange: (info: EditInfo) => any,
  onClose: () => void,
  onSubmit: () => void
};
