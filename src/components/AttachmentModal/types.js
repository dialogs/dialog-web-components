/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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
  sendAsFile: boolean,
  attachments: Attachment[],
  onClose: () => mixed,
  onSend: (attachments: Attachment[]) => mixed,
  onSendAll: (attachments: Attachment[]) => mixed,
  onCurrentChange: (current: number) => mixed,
  onSendAsFileChange: (sendAsFIle: boolean) => mixed
};

export type AttachmentPreviewProps = {
  className?: string,
  fileClassName?: string,
  imageClassName?: string,
  file: AttachmentFile
};

export type AttachmentMetaProps = {
  className?: string,
  attachment: Attachment,
  sendAsFile: boolean,
  onSendAsFileChange: (sendAsFIle: boolean) => mixed
};
