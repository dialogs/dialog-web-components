/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, MessageAttachment } from '@dlghq/dialog-types';
import flatten from '../flatten';

function createMessage(attachment: ?MessageAttachment) {
  return {
    attachment,
    rid: String(Math.random()),
    mid: String(Math.random()),
    date: '00:00',
    fullDate: new Date(),
    sender: null,
    content: {
      type: 'text',
      text: 'test'
    },
    reactions: [],
    state: 'unknown',
    sortKey: '1',
    sortDate: 1,
    isOut: true,
    isOnServer: true
  };
}

function createReply(messages: Message[]) {
  return { messages, type: 'reply' };
}

describe('Flatten message attachments', () => {
  test('flatten one depth level', () => {
    const reply = createReply([createMessage(null)]);

    expect(flatten(reply)).toEqual([reply]);
  });

  test('flatten two depth level', () => {
    const child0 = createReply([createMessage(null)]);
    const child1 = createReply([createMessage(child0)]);
    const child2 = createReply([createMessage(null)]);
    const parent = createReply([createMessage(child1), createMessage(child2)]);

    expect(flatten(parent)).toEqual([child0, child1, child2, parent]);
  });
});
