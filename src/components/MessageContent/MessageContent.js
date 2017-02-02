/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContent as MessageContentTypes } from '@dlghq/dialog-types';
import React from 'react';
import Text from './Text/Text';
import Photo from './Photo/Photo';
import Sticker from './Sticker/Sticker';
import Document from './Document/Document';
import Voice from './Voice/Voice';
import Location from './Location/Location';
import Contact from './Contact/Contact';

export type Props = {|
  className?: string,
  content: MessageContentTypes,
  isPending?: boolean,
  onLightboxOpen: () => any
|};

function MessageContent({ className, content, isPending, onLightboxOpen }: Props) {
  switch (content.type) {
    case 'text':
      return (
        <Text
          className={className}
          text={content.text}
          media={content.media}
          isPending={isPending}
        />
      );

    case 'service':
      return (
        <Text
          service
          className={className}
          text={content.text}
          isPending={isPending}
        />
      );

    case 'photo':
      return (
        <Photo
          className={className}
          width={content.width}
          height={content.height}
          preview={content.preview}
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          isUploading={isPending || content.isUploading}
          onClick={onLightboxOpen}
        />
      );

    case 'sticker':
      return (
        <Sticker
          className={className}
          emoji={content.emoji}
          image={content.image}
          width={content.width}
          height={content.height}
          isPending={isPending}
        />
      );

    case 'document':
      return (
        <Document
          className={className}
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          fileSize={content.fileSize}
          fileExtension={content.fileExtension}
          isUploading={isPending || content.isUploading}
        />
      );

    case 'voice':
      return (
        <Voice
          fileUrl={content.fileUrl}
          duration={content.duration}
        />
      );

    case 'location':
      return (
        <Location
          latitude={content.latitude}
          longitude={content.longitude}
        />
      );

    case 'contact':
      return (
        <Contact
          name={content.name}
          photo64={content.photo64}
          phones={content.phones}
          emails={content.emails}
        />
      );

    default:
      console.warn('Unsupported message content: ', content); // eslint-disable-line
      return <Text text={`Unsupported message content (${content.type}).`} service />;
  }
}

export default MessageContent;
