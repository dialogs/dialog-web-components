/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint-disable complexity */

import type { DocumentType } from './getDocumentType';

function getExtensionType(extension: string): DocumentType {
  // TODO: add more types
  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'pages':
    case 'numbers':
    case 'txt':
    case 'json':
    case 'xml':
      return 'document';

    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'picture';

    case 'mov':
    case 'mkv':
    case 'mpeg':
    case 'avi':
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'media';

    case 'dmg':
    case 'iso':
    case 'zip':
    case '7z':
    case 'rar':
      return 'compressed';

    default:
      return 'unknown';
  }
}

export default getExtensionType;
