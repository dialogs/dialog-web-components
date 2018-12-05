/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { Component, type Node } from 'react';

export const STATE_PENDING = 'pending';
export const STATE_SUCCESS = 'success';
export const STATE_ERROR = 'error';

export type ImageState = 'pending' | 'success' | 'error';

export type State = {
  state: ImageState,
  src: ?string,
  error: ?mixed,
};

export type Props = {
  src: ?string,
  onChange?: (state: State) => mixed,
  children: (state: State) => Node,
};

class ImagePreloader extends Component<Props, State> {
  requestId: ?AnimationFrameID; // eslint-disable-line no-undef
  image: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      state: STATE_PENDING,
      src: null,
      error: null,
    };
  }

  componentDidMount(): void {
    if (this.props.src) {
      this.handleStartFetch(this.props.src);
    }
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): $Shape<State> {
    return {
      src: nextProps.src === null ? null : prevState.src,
      state: nextProps.src === prevState.src ? prevState.state : STATE_PENDING,
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.src === null) {
      this.handleStopFetch();
    }

    if (
      this.props.src &&
      this.props.src !== prevProps.src &&
      !this.state.state !== STATE_PENDING
    ) {
      this.handleStartFetch(this.props.src);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  componentWillUnmount(): void {
    this.handleStopFetch();
  }

  handleStartFetch = (src: string): void => {
    this.handleStopFetch();
    this.requestId = requestAnimationFrame(() => {
      const image = document.createElement('img');

      image.onload = this.handleSuccess;
      image.onerror = this.handleError;
      image.src = src;

      if (image.complete) {
        this.handleSuccess();
      }

      this.image = image;
    });
  };

  handleStopFetch = (): void => {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }

    this.handleImageClear();
  };

  handleImageClear = (): void => {
    if (this.image) {
      this.image.src = '';
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  };

  handleSuccess = (): void => {
    this.setState({
      state: STATE_SUCCESS,
      src: this.props.src,
    });
    this.handleStopFetch();
  };

  handleError = (error: ?mixed): void => {
    this.setState({
      state: STATE_ERROR,
      src: this.props.src,
      error,
    });
    this.handleStopFetch();
  };

  render() {
    return this.props.children(this.state);
  }
}

export default ImagePreloader;
