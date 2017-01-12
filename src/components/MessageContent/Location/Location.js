/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentLocation } from '@dlghq/dialog-types';
import React from 'react';
import Map from '../../Map/Map';
import styles from './Location.css';

function Location(props: MessageContentLocation) {
  return (
    <Map
      className={styles.container}
      apiKey="AIzaSyCV9I5_GAlbDMcVnD87TcONL2YaPv_d-LA"
      width={400}
      height={200}
      latitude={props.latitude}
      longitude={props.longitude}
    />
  );
}

export default Location;
