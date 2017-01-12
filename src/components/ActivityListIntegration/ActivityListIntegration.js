/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivityListItem from '../ActivityList/ActivityListItem';
import Icon from '../Icon/Icon';
import styles from './ActivityListIntegration.css';

export type Props = {
  className?: string,
  onClick: () => any
};

function ActivityListIntegration(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <ActivityListItem className={className} onClick={props.onClick}>
      <Icon
        inverted
        glyph="extension"
        theme="info"
        className={styles.icon}
      />
      <Text
        tagName="div"
        id="ActivityListIntegration.title"
        className={styles.text}
      />
      <Icon glyph="keyboard_arrow_right" className={styles.arrow} />
    </ActivityListItem>
  );
}

export default ActivityListIntegration;
