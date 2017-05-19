/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Map from '../../Map/Map';
import styles from './Location.css';

export type Props = {|
  latitude: number,
  longitude: number,
  maxWidth: number
|};

function Location(props: Props) {
  return (
    <Map
      className={styles.container}
      apiKey="AIzaSyCV9I5_GAlbDMcVnD87TcONL2YaPv_d-LA"
      width={props.maxWidth}
      height={props.maxWidth / 2}
      latitude={props.latitude}
      longitude={props.longitude}
    />
  );
}

export default Location;
