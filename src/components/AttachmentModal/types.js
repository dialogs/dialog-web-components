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
  sendAsFile: boolean,
  attachments: Attachment[],
  onClose: () => any,
  onSend: (attachments: Attachment[]) => any,
  onSendAll: (attachments: Attachment[]) => any,
  onCurrentChange: (current: number) => any,
  onSendAsFileChange: (sendAsFIle: boolean) => any
};

export type AttachmentPreviewProps = {
  file: AttachmentFile
};

export type AttachmentMetaProps = {
  attachment: Attachment,
  sendAsFile: boolean,
  onSendAsFileChange: (sendAsFIle: boolean) => any
};
