/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageAttachment } from '@dlghq/dialog-types';
import mapNotNull from '../../../utils/mapNotNull';

function isEmpty(attach: MessageAttachment): boolean {
  return attach.messages.every((child) => {
    return child.content.type === 'text' && !child.content.text;
  });
}

function flattenTree(tree: MessageAttachment[], result: MessageAttachment[]) {
  tree.forEach((attach) => {
    if (attach.messages) {
      const childTree = mapNotNull(attach.messages, (message) => message.attachment);
      flattenTree(childTree, result);
    }

    if (!isEmpty(attach)) {
      result.push(attach);
    }
  });
}

function flattenMessageAttachment(attach: MessageAttachment): MessageAttachment[] {
  const result = [];
  flattenTree([attach], result);

  return result;
}

export default flattenMessageAttachment;
