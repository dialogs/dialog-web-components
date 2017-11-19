/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint max-len:0 */

import * as React from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './EmptyChat.css';

export type EmptyChatProps = {
  className?: string
};

function EmptyChat(props: EmptyChatProps) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 105 90"
        className={styles.image}
      >
        <defs>
          <linearGradient
            id="a"
            x2="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-46.5 -70 58 -56.1 46.5 70)"
          >
            <stop offset="0" stopColor="#400B9A" />
            <stop offset="1" stopColor="#79149A" />
          </linearGradient>
          <linearGradient
            id="b"
            x2="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-59.8 -90 74.6 -72.2 59.8 90)"
          >
            <stop offset="0" stopColor="#400B9A" />
            <stop offset="1" stopColor="#79149A" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          fillRule="evenodd"
          d="M49.496 8.492c11.323 11.325 11.323 29.68 0 41.004L28.993 70V57.99c-7.42-.002-14.84-2.832-20.5-8.494-11.324-11.32-11.324-29.68 0-41.004 11.322-11.323 29.68-11.323 41.003 0z"
          transform="translate(47 20)"
          opacity=".35"
        />
        <path
          fill="url(#b)"
          fillRule="evenodd"
          d="M63.638 10.92c14.56 14.56 14.56 38.16 0 52.718L37.278 90V74.557c-9.54 0-19.08-3.64-26.36-10.92-14.557-14.555-14.557-38.158 0-52.718 14.558-14.56 38.162-14.56 52.72 0z"
        />
      </svg>
      <Text id="EmptyChat.title" tagName="h2" className={styles.title} />
      <Text id="EmptyChat.text" tagName="p" className={styles.text} />
    </div>
  );
}

export default EmptyChat;
