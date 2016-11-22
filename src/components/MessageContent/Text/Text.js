/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentText } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import MessageMedia from '../../MessageMedia/MessageMedia';
import Markdown from '../../Markdown/Markdown';
import styles from './Text.css';

export type Props = MessageContentText & {
  service?: boolean,
  className?: string
}

function Text(props: Props) {
  if (props.service) {
    const className = classNames(styles.container, styles.service, props.className);

    return (
      <div className={className}>
        {props.text}
      </div>
    );
  }

  const className = classNames(styles.container, props.className);

  if (props.media) {
    return (
      <div className={className}>
        <Markdown className={styles.wrapper} text={props.text} />
        <MessageMedia media={props.media} />
      </div>
    );
  }

  return (
    <Markdown className={className} text={props.text} />
  );
}

export default Text;
