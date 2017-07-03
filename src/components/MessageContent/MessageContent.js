/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContent as MessageContentTypes } from '@dlghq/dialog-types';
import React from 'react';
import Text from './Text/Text';
import Service from './Text/Service';
import Photo from './Photo/Photo';
import Sticker from './Sticker/Sticker';
import Document from './Document/Document';
import Voice from './Voice/Voice';
import Video from './Video/Video';
import Location from './Location/Location';
import Contact from './Contact/Contact';

export type Props = {
  className?: string,
  rid: string,
  content: MessageContentTypes,
  isPending?: boolean,
  onLightboxOpen?: (event: SyntheticMouseEvent) => any,
  maxHeight: number,
  maxWidth: number
};

function MessageContent({ className, content, isPending, onLightboxOpen, rid, maxHeight, maxWidth }: Props) {
  switch (content.type) {
    case 'text':
      return (
        <Text
          className={className}
          text={content.text}
          media={content.media}
          isPending={isPending}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );

    case 'service':
      return (
        <Service
          className={className}
          text={content.text}
          isPending={isPending}
        />
      );

    case 'photo':
      return (
        <Photo
          rid={rid}
          className={className}
          width={content.width}
          height={content.height}
          preview={content.preview}
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          isUploading={isPending || content.isUploading}
          onClick={onLightboxOpen}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
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
          maxWidth={maxWidth}
        />
      );

    case 'voice':
      return (
        <Voice
          duration={content.duration}
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          fileSize={content.fileSize}
          fileExtension={content.fileExtension}
          isUploading={isPending || content.isUploading}
          maxWidth={maxWidth}
        />
      );

    case 'video':
      return (
        <Video
          className={className}
          width={content.width}
          height={content.height}
          preview={content.preview}
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          duration={content.duration}
          isUploading={isPending || content.isUploading}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );

    case 'location':
      return (
        <Location
          latitude={content.latitude}
          longitude={content.longitude}
          maxWidth={maxWidth}
        />
      );

    case 'contact':
      return (
        <Contact
          name={content.name}
          photo64={content.photo64}
          phones={content.phones}
          emails={content.emails}
          maxWidth={maxWidth}
        />
      );

    default:
      return (
        <Service
          className={className}
          text={`Unsupported message content (${content.type}).`}
        />
      );
  }
}

export default MessageContent;
