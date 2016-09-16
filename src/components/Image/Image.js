import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Image.css';

const STATE_LOADING = 1;
const STATE_SUCCESS = 2;
const STATE_ERROR = 3;

class Image extends Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    preview: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      state: STATE_LOADING,
      error: null
    };
  }

  componentWillMount() {
    if (this.props.src) {
      this.startFetch(this.props.src);
    }
  }

  componentWillReceiveProps({ src }) {
    if (src && this.props.src !== src) {
      this.startFetch(src);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.state !== this.state.state ||
      nextProps.src !== this.props.src ||
      nextProps.alt !== this.props.alt ||
      nextProps.preview !== this.props.preview ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height;
  }

  componentWillUnmount() {
    this.stopFetch();
  }

  getSource() {
    const { preview, src } = this.props;
    const { state } = this.state;

    if (preview && state !== STATE_SUCCESS) {
      return preview;
    }

    return src;
  }

  startFetch(src) {
    this.stopFetch();
    this.image = document.createElement('img');

    this.image.onload = () => {
      this.setState({ state: STATE_SUCCESS });
    };

    this.image.onerror = (error) => {
      this.setState({ error, state: STATE_ERROR });
    };

    this.image.src = src;
  }

  stopFetch() {
    if (this.image) {
      this.image.src = null;
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  }

  render() {
    const { state } = this.state;
    const { alt, width, height, className } = this.props;
    const source = this.getSource();
    const imageClassName = classNames(styles.root, {
      [styles.preview]: state !== STATE_SUCCESS,
      [styles.loading]: state === STATE_LOADING,
      [styles.success]: state === STATE_SUCCESS,
      [styles.error]: state === STATE_ERROR
    }, className);

    return (
      <img
        className={imageClassName}
        src={source}
        width={width}
        height={height}
        alt={alt}
      />
    );
  }
}

export default Image;
