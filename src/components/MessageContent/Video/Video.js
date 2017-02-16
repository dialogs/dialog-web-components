/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import Icon from '../../Icon/Icon';
import styles from './Video.css';

export type Props = {
  // type: 'video',
  width: number,
  height: number,
  duration: number,
  preview: string,
  className?: string,
  fileUrl:
    ? string,
  fileName:
    ? string,
  // fileSize:
  //   ? string,
  // fileExtension:
  //   ? string,
  // isUploading: boolean
};

function toTwoChars(num : number | string) {
  if (num.toString().length < 2) {
    return `0${num}`;
  }
  return num;
}

function getDuration(duration : number) : String {
  let seconds = Math.round(duration / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Math.round(minutes / 60);

  seconds -= minutes * 60;
  seconds = toTwoChars(seconds < 0 ? 0 : seconds);
  minutes -= hours * 60;
  minutes = toTwoChars(minutes < 0 ? 0 : minutes);

  if (hours < 1) {
    return `${minutes}:${seconds}`;
  }

  hours = toTwoChars(hours);

  return `${hours}:${minutes}:${seconds}`;
}

function Video(props : Props) : React.Element < any > {
  const { fileUrl, fileName, preview, width, height, duration } = props;
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      <div className={styles.preview}>
        <Image
          className={styles.img}
          src={preview}
          alt={fileName}
          preview={preview}
          width={width}
          height={height}
        />
        <Icon
          className={styles.playIcon}
          glyph="play"
          theme="dark"
          size="large"
          inverted
        />
        <div className={styles.duration}>
          {getDuration(duration)}
        </div>
      </div>
    </div>

  );
}

export default Video;
