/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type AttachmentFile = Blob | File;

export type Attachment = {
  file: AttachmentFile,
  isDocument: boolean
};

export type AttachmentModalProps = {
  className?: string,
  current: number,
  attachments: Attachment[],
  onClose: () => any,
  onSend: (attachments: Attachment[]) => any,
  onSendAll: (attachments: Attachment[]) => any,
  onCurrentChange: (current: number) => any,
  onAttachmentChange: (index: number, attachment: Attachment) => any
};

export type AttachmentPreviewProps = {
  file: AttachmentFile
};

export type AttachmentMetaProps = {
  attachment: Attachment,
  onChange: (attachment: Attachment) => any
};
