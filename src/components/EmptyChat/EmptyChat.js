/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './EmptyChat.css';

export type EmptyChatProps = {
  className?: string
}

function EmptyChat(props: EmptyChatProps) {
  const className = classNames(styles.container, props.className);

  return (
    <Text id="EmptyChat.caption" tagName="div" className={className} />
  );
}

export default EmptyChat;
