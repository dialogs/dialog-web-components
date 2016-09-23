/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type AttachmentModalProps = {
  className?: string,
  attachments: File[],
  isOpen: boolean,
  onClose: () => any,
  onSend: (file: File) => any
};

export type AttachmentModalState = {
  current: number
};
