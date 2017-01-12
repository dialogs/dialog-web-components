/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint max-len: 0 */

import React from 'react';
import classNames from 'classnames';
import styles from './ToolbarFavouriteButton.css';

export type Props = {
  className?: string,
  value: boolean,
  onClick: () => void
};

function ToolbarFavouriteButton(props: Props) : React.Element<any> {
  const className = classNames(styles.container, props.className);

  if (props.value) {
    return (
      <div className={className} onClick={props.onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={styles.icon}>
          <defs>
            <linearGradient
              id="favouriteGradient"
              x1="82.85%"
              x2="24.084%"
              y1="7.904%"
              y2="100%"
            >
              <stop stopColor="#FFC000" offset="0%" />
              <stop stopColor="#FF9400" offset="100%" />
            </linearGradient>
          </defs>
          <path
            transform="translate(0, -1)"
            fill="url(#favouriteGradient)"
            d="M20.11 11.93l-2.938-6.92c-.648-1.527-1.693-1.535-2.34-.01l-2.943 6.945-7.533.64c-1.65.14-1.975 1.13-.72 2.217l5.72 4.955L7.64 27.12c-.376 1.613.464 2.23 1.885 1.37L16 24.585l6.473 3.907c1.418.857 2.265.248 1.89-1.37l-1.708-7.363 5.71-4.955c1.25-1.085.93-2.08-.723-2.222l-7.532-.65z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={className} onClick={props.onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={styles.icon}>
        <path
          fill="rgba(0,0,0,.38)"
          transform="translate(0, -1)"
          d="M19.934 12.268L17.17 5.756c-.646-1.522-1.692-1.523-2.34.004l-2.764 6.522-7.073.6c-1.653.14-1.978 1.133-.72 2.223l5.37 4.653-1.612 6.916c-.376 1.616.467 2.233 1.89 1.373l6.08-3.67 6.08 3.67c1.42.858 2.27.246 1.894-1.373l-1.604-6.916 5.36-4.653c1.254-1.087.933-2.084-.723-2.227l-7.073-.61zM16 21.76l-5.264 3.178 1.4-5.992-4.648-4.032 6.132-.532L16 8.74l2.394 5.656 6.132.532-4.648 4.032 1.4 5.992L16 21.76z"
        />
      </svg>
    </div>
  );
}

export default ToolbarFavouriteButton;
