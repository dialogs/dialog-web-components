/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import WelcomeMessageGroup from './WelcomeMessageGroup';
import WelcomeMessageUser from './WelcomeMessageUser';
import WelcomeMessageChannel from './WelcomeMessageChannel';

export type Props = {
  className?: string,
  type: 'group' | 'channel' | 'user',
  title: string,
  isAdmin?: ?boolean,
  isOwner?: ?boolean,
  isContact?: ?boolean,
  isFavourite?: ?boolean,
  createdAt?: ?string,
  creator?: ?string,
  userName?: ?string,
  renderActions?: () => Node
};

function WelcomeMessage(props: Props) {
  switch (props.type) {
    case 'group':
      return (
        <WelcomeMessageGroup {...props} />
      );
    case 'channel':
      return (
        <WelcomeMessageChannel {...props} />
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
