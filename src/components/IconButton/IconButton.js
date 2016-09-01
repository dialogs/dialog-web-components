/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';

class IconButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    glyph: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['normal', 'large']).isRequired,
    flat: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    size: 'normal',
    disabled: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.glyph !== this.props.glyph ||
           nextProps.size !== this.props.size ||
           nextProps.flat !== this.props.flat ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.onClick !== this.props.onClick ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { glyph, onClick, className, size, disabled, flat } = this.props;
    const buttonClassName = classNames(styles.root, styles[size], {
      [styles.disabled]: disabled,
      [styles.defaultStyle]: !flat,
      [styles.flatStyle]: flat
    }, className);

    return (
      <button className={buttonClassName} onClick={onClick} disabled={disabled}>
        <Icon glyph={glyph} className={styles.icon} />
      </button>
    );
  }
}

export default IconButton;
