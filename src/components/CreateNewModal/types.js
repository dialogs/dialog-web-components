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
  request: Request,
  step: Step;
  className?: string,
  isOpen: boolean,
  onChange: (request: Request) => any,
  onStepChange: (step: Step) => any,
  onSubmit: (request: Request) => any,
  onClose: Function,
}
