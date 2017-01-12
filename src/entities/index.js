/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import type { SelectorState } from './types';
import createSelectorState from './createSelectorState';

const ContactSelectorState = createSelectorState(
  'ContactSelectorState',
  (contact: Contact) => contact.name
);

export type {
  SelectorState
};

export {
  ContactSelectorState
};
