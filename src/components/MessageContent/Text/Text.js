/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentText } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import markdown from '@dlghq/markdown';
import MessageMedia from '../../MessageMedia/MessageMedia';
import styles from './Text.css';

function Text(props: MessageContentText) {
  if (props.service) {
    const className = classNames(styles.container, styles.service);

    return (
      <div className={className}>
        {props.text}
      </div>
    );
  }

  if (props.media) {
    return (
      <div className={styles.container}>
        <div
          className={styles.wrapper}
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: markdown(props.text) }}
        />
        <MessageMedia media={props.media} />
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: markdown(props.text) }}
    />
  );
}

export default Text;
