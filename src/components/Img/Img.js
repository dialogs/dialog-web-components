import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Img.css';

const STATE_LOADING = 1;
const STATE_SUCCESS = 2;
const STATE_ERROR = 3;

class Img extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    preview: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      state: STATE_LOADING
    };

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleErrorSuccess = this.handleErrorSuccess.bind(this);
  }

  componentDidMount() {
    this.fetchImage();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.state !== this.state.state ||
           nextProps.src !== this.props.src ||
           nextProps.alt !== this.props.alt ||
           nextProps.preview !== this.props.preview ||
           nextProps.width !== this.props.width ||
           nextProps.height !== this.props.height;
  }

  handleLoadSuccess() {
    this.setState({ state: STATE_SUCCESS });
    this.removeListeners();
  }

  handleErrorSuccess() {
    this.setState({ state: STATE_ERROR });
    this.removeListeners();
  }

  getSource() {
    const { preview, src } = this.props;
    const { state } = this.state;

    if (preview && state !== STATE_SUCCESS) {
      return preview;
    }

    return src;
  }

  fetchImage() {
    const { src } = this.props;

    this.image = new Image();
    this.image.addEventListener('load', this.handleLoadSuccess);
    this.image.addEventListener('error', this.handleLoadSuccess);
    this.image.src = src;
  }

  removeListeners() {
    this.image.removeEventListener('load', this.handleLoadSuccess);
    this.image.removeEventListener('error', this.handleLoadSuccess);
  }

  render() {
    const { state } = this.state;
    const { alt, width, height, className } = this.props;
    const source = this.getSource();
    const imageClassName = classnames(styles.root, {
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

export default Img;
