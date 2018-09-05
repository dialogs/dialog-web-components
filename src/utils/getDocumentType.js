/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint-disable complexity */

export type DocumentType = 'unknown' | 'document' | 'media' | 'picture' | 'compressed';

function getDocumentType(mime: string): DocumentType {
  const [type, subtype] = mime.split('/');

  switch (type) {
    case 'image':
      return 'picture';

    case 'audio':
    case 'video':
      return 'media';

    case 'text':
      return 'document';

    case 'application':
      switch (subtype) {
        case 'pdf':
        case 'rtf':
        case 'x-iwork-keynote-sffkey':
        case 'x-iwork-pages-sffpages':
        case 'x-iwork-numbers-sffnumbers':
        case 'vnd.msword':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'vnd.ms-powerpoint':
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'vnd.ms-excel':
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'xml':
        case 'json':
          return 'document';

        case 'zip':
        case 'x-rar-compressed':
        case '-z7z-compressed':
        case 'x-tar':
        case 'x-bzip':
        case 'x-bzip2':
        case 'java-archive':
          return 'compressed';

        default:
          return 'unknown';
      }

    default:
      return 'unknown';
  }
}

export default getDocumentType;
