/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import getImageSize from '../../utils/getImageSize';
import ImagePreloader, {
  STATE_SUCCESS,
} from '../ImagePreloader/ImagePreloader';
import styles from './Image.css';

export type Props = {
  className?: string,
  src: ?string,
  id?: string,
  alt?: ?string,
  preview?: ?string,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

class Image extends PureComponent<Props, void> {
  static defaultProps = {
    maxWidth: 400,
    maxHeight: 400,
  };

  getSize() {
    const { width, height, maxWidth, maxHeight } = this.props;

    return getImageSize(width, height, maxWidth, maxHeight);
  }

  render() {
    const { preview } = this.props;
    const { width, height } = this.getSize();
    const className = classNames(styles.container, this.props.className);

    return (
      <div
        className={className}
        title={this.props.alt}
        style={{ width, height }}
      >
        <ImagePreloader src={this.props.src}>
          {({ state, src }) => {
            const source = state === STATE_SUCCESS ? src : preview;

            if (!source) {
              return null;
            }

            return (
              <img
                id={this.props.id}
                src={source}
                width={width}
                height={height}
                alt={this.props.alt}
                onClick={this.props.onClick}
              />
            );
          }}
        </ImagePreloader>
      </div>
    );
  }
}

export default Image;
