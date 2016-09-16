/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './EmptyChat.css';

function EmptyChat(props) {
  const className = classNames(styles.root, props.className);

  return (
    <div className={className}>
      <Text id="EmptyChat.caption" tagName="p" />
    </div>
  );
}

EmptyChat.propTypes = {
  className: PropTypes.string
};

export default EmptyChat;
