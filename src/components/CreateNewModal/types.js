/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';

export type Request = {
  type: 'group' | 'channel',
  title: string,
  shortname: string,
  about: string,
  avatar: ?File,
  members: SelectorState<PeerInfo>
};

export type Step = 'type' | 'info' | 'avatar' | 'members';

export type Props = {
  id: string,
  className?: string,
  step: Step,
  error: ?string,
  pending: boolean,
  request: Request,
  shortnamePrefix?: ?string,
  autoFocus: boolean,
  onClose: () => any,
  onSubmit: (request: Request) => any,
  onStepChange: (step: Step) => any,
  onRequestChange: (request: Request) => any
}
