/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import styles from './DownloadButton.css';

export type Props = {
  isUploading: boolean,
  className?: string
}

class DownloadButton extends PureComponent {
  props: Props;

  render() {
    const { isUploading } = this.props;
    const className = classNames(styles.container, {
      [styles.uploading]: isUploading
    }, this.props.className);

    return (
      <div className={className}>
        <Icon glyph={isUploading ? 'arrow_up' : 'arrow_down'} className={styles.arrow} size={26} />
        <svg viewBox="0 0 50 50" className={styles.button}>
          <circle
            className={styles.border}
            cx="25"
            cy="25"
            r="24"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    );
  }
}

export default DownloadButton;
