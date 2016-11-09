/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentText } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import { memoize } from 'lodash';
import markdown from '@dlghq/markdown';
import MessageMedia from '../../MessageMedia/MessageMedia';
import styles from './Text.css';

const textToHtml = memoize(markdown);

export type Props = MessageContentText & {
  service?: boolean,
  className?: string
}

function Text(props: Props) {
  const className = classNames(styles.container, {
    [styles.service]: props.service
  }, props.className);

  if (props.service) {
    return (
      <div className={className}>
        {props.text}
      </div>
    );
  }

  if (props.media) {
    return (
      <div className={className}>
        <div
          className={styles.wrapper}
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: textToHtml(props.text) }}
        />
        <MessageMedia media={props.media} />
      </div>
    );
  }

  return (
    <div
      className={className}
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: textToHtml(props.text) }}
    />
  );
}

export default Text;
