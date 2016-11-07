/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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
      apiKey="AIzaSyDxiVlTaA3lh1zy1h9rZUYGaDvSj4DUNsQ"
      width={400}
      height={200}
      latitude={props.latitude}
      longitude={props.longitude}
    />
  );
}

export default Location;
