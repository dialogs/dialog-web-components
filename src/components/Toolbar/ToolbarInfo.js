/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  title: string,
  status: string
};

function ToolbarInfo(props: Props): React.Element<any> {
  const className = classNames(styles.info, props.className);

  return (
    <div className={className}>
      <div className={styles.name}>
        {props.title}
        <Icon glyph="favourite" onClick={console.debug} className={styles.favourite} />
      </div>
      <div className={styles.status}>{props.status}</div>
    </div>
  );
}

export default ToolbarInfo;
