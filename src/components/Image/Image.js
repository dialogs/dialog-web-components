/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getImageSize from '../../utils/getImageSize';
import styles from './Image.css';

const STATE_LOADING = 1;
const STATE_SUCCESS = 2;
const STATE_ERROR = 3;

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
  onClick?: (event: SyntheticMouseEvent) => void
}

export type State = {
  state: 1 | 2 | 3,
  error: ?any
}

class Image extends PureComponent {
  props: Props;
  state: State;

  requestId: ?number;
  image: ?HTMLImageElement;

  static defaultProps = {
    maxWidth: 400,
    maxHeight: 400
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      state: STATE_LOADING,
      error: null
    };
  }

  componentDidMount(): void {
    if (this.props.src) {
      this.startFetch(this.props.src);
    }
  }

  componentWillReceiveProps({ src }: Props): void {
    if (src && this.props.src !== src) {
      this.startFetch(src);
    }
  }

  componentWillUnmount(): void {
    this.stopFetch();
  }

  getSize() {
    const { width, height, maxWidth, maxHeight } = this.props;

    return getImageSize(width, height, maxWidth, maxHeight);
  }

  startFetch(src: string): void {
    this.stopFetch();
    this.requestId = requestAnimationFrame(() => {
      const image = document.createElement('img');

      image.onload = () => {
        this.setState({ state: STATE_SUCCESS });
        this.stopFetch();
      };

      image.onerror = (error) => {
        this.setState({ error, state: STATE_ERROR });
        this.stopFetch();
      };

      image.src = src;

      this.image = image;
    });
  }

  stopFetch(): void {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }

    if (this.image) {
      this.image.src = '';
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  }

  render(): React.Element<any> {
    const { preview, src } = this.props;
    const { state } = this.state;

    const isPreview = state !== STATE_SUCCESS;
    const source = isPreview ? preview : src;
    const { width, height } = this.getSize();
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} title={this.props.alt} style={{ width, height }}>
        {
          source ? (
            <img
              id={this.props.id}
              src={source}
              width={width}
              height={height}
              alt={this.props.alt}
              onClick={this.props.onClick}
            />
          ) : null
        }
      </div>
    );
  }
}

export default Image;
