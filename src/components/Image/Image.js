import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Image.css';

const STATE_LOADING = 1;
const STATE_SUCCESS = 2;
const STATE_ERROR = 3;

class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    preview: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    maxWidth: PropTypes.number.isRequired,
    maxHeight: PropTypes.number.isRequired
  };

  static defaultProps = {
    maxWidth: 300,
    maxHeight: 400
  };

  constructor(props) {
    super(props);

    this.state = {
      state: STATE_LOADING
    };
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
           nextProps.height !== this.props.height ||
           nextProps.maxWidth !== this.props.maxWidth ||
           nextProps.maxHeight !== this.props.maxHeight;
  }

  getDimensions() {
    const { width, height, maxWidth, maxHeight } = this.props;

    if (width > height && width > maxWidth) {
      return {
        width: maxWidth,
        height: height * (maxWidth / width)
      };
    }

    if (height > maxHeight) {
      return {
        width: width * (maxHeight / height),
        height: maxHeight
      };
    }

    return { width, height };
  }

  getSource() {
    if (this.props.preview && this.state.state !== STATE_SUCCESS) {
      return this.props.preview;
    }

    return this.props.src;
  }

  fetchImage() {
    const image = new Image();
    image.onload = () => this.setState({ state: STATE_SUCCESS });
    image.onerror = () => this.setState({ state: STATE_ERROR });
    image.src = this.props.src;
  }

  render() {
    const source = this.getSource();
    const { width, height } = this.getDimensions();
    const className = classNames(styles.image, {
      [styles.loading]: this.state.state === STATE_LOADING,
      [styles.success]: this.state.state === STATE_SUCCESS,
      [styles.fail]: this.state.state === STATE_ERROR
    });

    return (
      <img
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
