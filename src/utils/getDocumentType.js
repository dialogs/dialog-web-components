/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type DocumentType = 'unknown' | 'document' | 'media';

function getDocumentType(extension: string): DocumentType {
  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
      return 'document';

    case 'mov':
    case 'mpeg':
    case 'avi':
      return 'media';

    default:
      return 'unknown';
  }
}

export default getDocumentType;
