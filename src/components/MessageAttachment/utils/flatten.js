/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageAttachment } from '@dlghq/dialog-types';
import { mapNotNull } from '@dlghq/dialog-utils';

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

function filterDuplicates(attachments: MessageAttachment[]): MessageAttachment[] {
  const mids = new Set();
  const result = [];
  attachments.forEach((attach) => {
    const messages = attach.messages.filter((message) => {
      if (mids.has(message.mid)) {
        return false;
      }

      mids.add(message.mid);

      return true;
    });

    if (messages.length) {
      // $FlowFixMe: both types contains messages object
      result.push({ ...attach, messages });
    }
  });

  return result;
}

function flattenMessageAttachment(attach: MessageAttachment): MessageAttachment[] {
  const result = [];
  flattenTree([attach], result);

  return filterDuplicates(result);
}

export default flattenMessageAttachment;
