import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import isEmoji from '../../utils/isEmoji';
import styles from './Avatar.css';

const SIZES = {
  tiny: 24,
  small: 36,
  medium: 44,
  large: 60,
  big: 120,
  huge: 200
};

class Avatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.oneOf([
      'tiny', 'small', 'medium', 'large', 'big', 'huge'
    ]).isRequired,
    placeholder: PropTypes.oneOf([
      'empty', 'lblue', 'blue', 'purple', 'red', 'orange', 'yellow', 'green'
    ]).isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    title: '',
    size: 'small',
    placeholder: 'empty'
  };

  shouldComponentUpdate(prevProps) {
    return prevProps.image !== this.props.image ||
           prevProps.placeholder !== this.props.placeholder ||
           prevProps.title !== this.props.title ||
           prevProps.size !== this.props.size ||
           prevProps.className !== this.props.className;
  }

  getFirstChar() {
    const { title } = this.props;
    if (title.length) {
      const char = title[0];
      if (!isEmoji(char)) {
        return char;
      }
    }

    return '#';
  }

  render() {
    const { image, placeholder, title, size, onClick } = this.props;

    const className = classNames(
      styles.placeholder,
      styles[size],
      styles[placeholder],
      this.props.className,
      { [styles.clickable]: onClick }
    );

    if (image) {
      const imgSize = SIZES[size];

      return (
        <img
          className={className}
          src={image}
          width={imgSize}
          height={imgSize}
          alt={title}
          onClick={onClick}
        />
      );
    }

    return (
      <div className={className} onClick={onClick} title={title}>
        {this.getFirstChar()}
      </div>
    );
  }
}

export default Avatar;
