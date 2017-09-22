/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import WelcomeMessageGroup from './WelcomeMessageGroup';
import WelcomeMessageUser from './WelcomeMessageUser';

export type Props = {
  className?: string,
  type: 'group' | 'user',
  title: string,
  isAdmin?: ?boolean,
  isOwner?: ?boolean,
  isContact?: ?boolean,
  isFavourite?: ?boolean,
  createdAt?: ?string,
  creator?: ?string,
  userName?: ?string,
  renderActions?: () => mixed
};

function WelcomeMessage(props: Props) {
  switch (props.type) {
    case 'group':
      return (
        <WelcomeMessageGroup {...props} />
      );
    case 'user':
      return (
        <WelcomeMessageUser {...props} />
      );
    default:
      return null;
  }
}

export default WelcomeMessage;
