/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type Request = {
  type: 'group' | 'channel',
  title: string,
  shortname: string,
  about: string,
  avatar: ?File
};

export type Step = 'type' | 'info';

export type Props = {
  className?: string,
  step: Step,
  request: Request,
  onClose: () => any,
  onSubmit: (request: Request) => any,
  onStepChange: (step: Step) => any,
  onRequestChange: (request: Request) => any
}
