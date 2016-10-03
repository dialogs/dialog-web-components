/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type DocumentType = 'unknown' | 'document' | 'media';

function getDocumentType(mime: string): DocumentType {
  const [type, subtype] = mime.split('/');

  switch (type) {
    case 'image':
    case 'audio':
    case 'video':
      return 'media';

    case 'text':
      return 'document';

    case 'application':
      switch (subtype) {
        case 'pdf':
          return 'document';

        default:
          return 'unknown';
      }

    default:
      return 'unknown';
  }
}

export default getDocumentType;
