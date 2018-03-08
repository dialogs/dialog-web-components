/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Map from '../../Map/Map';
import styles from './Location.css';

export type Props = {|
  latitude: number,
  longitude: number,
  maxWidth: number
|};

class Location extends PureComponent<Props> {
  static defaultProps = {
    maxWidth: 400
  };

  render() {
    return (
      <Map
        className={styles.container}
        apiKey="AIzaSyCV9I5_GAlbDMcVnD87TcONL2YaPv_d-LA"
        width={this.props.maxWidth}
        height={this.props.maxWidth / 2}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
      />
    );
  }
}

export default Location;
