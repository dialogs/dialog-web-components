/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { DocumentType } from './getDocumentType';

function getExtensionType(extension: string): DocumentType {
  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'json':
    case 'xml':
      return 'document';

    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'picture';

    case 'mov':
    case 'mpeg':
    case 'avi':
      return 'media';

    default:
      return 'unknown';
  }
}

export default getExtensionType;
