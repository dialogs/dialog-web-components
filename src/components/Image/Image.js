/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import getImageSize from '../../utils/getImageSize';
import styles from './Image.css';

const STATE_LOADING = 1;
const STATE_SUCCESS = 2;
const STATE_ERROR = 3;

export type Props = {
  className?: string,
  src: ?string,
  alt?: ?string,
  preview?: string,
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

class Image extends Component {
  props: Props;
  state: State;

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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.state !== this.state.state ||
           nextProps.src !== this.props.src ||
           nextProps.alt !== this.props.alt ||
           nextProps.preview !== this.props.preview ||
           nextProps.width !== this.props.width ||
           nextProps.height !== this.props.height;
  }

  componentWillUnmount(): void {
    this.stopFetch();
  }

  getSource(): ?string {
    const { preview, src } = this.props;
    const { state } = this.state;

    if (preview && state !== STATE_SUCCESS) {
      return preview;
    }

    return src;
  }

  getSize() {
    const { width, height, maxWidth, maxHeight } = this.props;

    return getImageSize(width, height, maxWidth, maxHeight);
  }

  startFetch(src: string): void {
    setImmediate(() => {
      this.stopFetch();
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
    if (this.image) {
      this.image.src = '';
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  }

  render(): React.Element<any> {
    const source = this.getSource();
    const { width, height } = this.getSize();
    const className = classNames(styles.root, this.props.className);

    if (!source) {
      return (
        <div
          title={this.props.alt}
          style={{ width, height }}
        />
      );
    }

    return (
      <img
        onClick={this.props.onClick}
        className={className}
        src={source}
        width={width}
        height={height}
        alt={this.props.alt}
      />
    );
  }
}

export default Image;
