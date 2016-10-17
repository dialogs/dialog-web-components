/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import markdown from '@dlghq/markdown';
import styles from './Text.css';

export type Props = {
  text: string,
  service?: boolean
};

function Text(props: Props) {
  if (props.service) {
    return (
      <div className={classNames(styles.root, styles.service)}>
        {props.text}
      </div>
    );
  }

  const html = markdown(props.text);

  return (
    <div
      className={styles.root}
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Text;
