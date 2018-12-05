/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';

export type Request = {
  title: string,
  shortname: string,
  avatar: ?File,
  members: SelectorState<PeerInfo>,
};

export type Step = 'info' | 'avatar' | 'members';

export type Props = {
  id: string,
  className?: string,
  step: Step,
  error: ?string,
  pending: boolean,
  request: Request,
  shortnamePrefix?: ?string,
  autoFocus: boolean,
  isPublicGroupsEnabled: boolean,
  onClose: () => mixed,
  onSubmit: (request: Request) => mixed,
  onStepChange: (step: Step) => mixed,
  onRequestChange: (request: Request) => mixed,
};
