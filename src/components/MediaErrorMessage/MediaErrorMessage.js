/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 */

import * as React from 'react';
import { Text } from '@dlghq/react-l10n';

type Props = {
  error: MediaError
};

function getCode(error: MediaError): string {
  if (typeof MediaError === 'undefined') {
    return 'MEDIA_ERR_UNKNOWN';
  }

  const MEDIA_ERR_ABORTED = typeof MediaError.MEDIA_ERR_ABORTED === 'number' ? MediaError.MEDIA_ERR_ABORTED : 1;
  const MEDIA_ERR_NETWORK = typeof MediaError.MEDIA_ERR_NETWORK === 'number' ? MediaError.MEDIA_ERR_NETWORK : 2;
  const MEDIA_ERR_DECODE = typeof MediaError.MEDIA_ERR_DECODE === 'number' ? MediaError.MEDIA_ERR_DECODE : 3;
  const MEDIA_ERR_SRC_NOT_SUPPORTED =
    typeof MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED === 'number' ? MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED : 4;

  switch (error.code) {
    case MEDIA_ERR_ABORTED:
      return 'MEDIA_ERR_ABORTED';
    case MEDIA_ERR_NETWORK:
      return 'MEDIA_ERR_NETWORK';
    case MEDIA_ERR_DECODE:
      return 'MEDIA_ERR_DECODE';
    case MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
    default:
      return 'MEDIA_ERR_UNKNOWN';
  }
}

function MediaErrorMessage({ error, ...props }: Props) {
  return (
    <Text id={`MediaErrorMessage.${getCode(error)}`} {...props} />
  );
}

export default MediaErrorMessage;
