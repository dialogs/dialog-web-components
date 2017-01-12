/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
import React from 'react';

export type Props = {
  className?: string,
  apiKey?: string,
  width: number,
  height: number,
  latitude: number,
  longitude: number
};

function Map(props: Props): React.Element<any> {
  const href = `https://maps.google.com/?z=16&q=loc:${props.latitude},${props.longitude}`;
  let src = 'https://maps.googleapis.com/maps/api/staticmap?' +
                 `center=${props.latitude},${props.longitude}` +
                 '&zoom=16' +
                 '&scale=2' +
                 `&size=${props.width}x${props.height}` +
                 `&markers=color:0x6b00cb|${props.latitude},${props.longitude}`;

  if (props.apiKey) {
    src += `&key=${props.apiKey}`;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img
        src={src}
        className={props.className}
        width={props.width}
        height={props.height}
      />
    </a>
  );
}

export default Map;
