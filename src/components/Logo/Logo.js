/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */
/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Logo.css';

class Logo extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <svg viewBox="0 0 360 360" className={className}>
        <defs>
          <linearGradient id="a" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop stopColor="#3D01A4" offset="0%" />
            <stop stopColor="#8601B0" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M52.76 52.76c-70.346 70.343-70.346 184.137 0 254.48 70.343 70.346 184.137 70.346 254.48 0 70.346-70.343 70.346-184.137 0-254.48-70.343-70.346-184.137-70.346-254.48 0zm41.378 41.378c47.586-48.62 124.138-48.62 172.76 0 47.585 47.586 47.585 124.138 0 172.76L180 352.758v-50.69c-31.034 0-62.07-11.38-85.862-35.17-48.62-48.623-48.62-125.175 0-172.76z"
          fill="url(#a)"
        />
      </svg>
    );
  }
}

export default Logo;
