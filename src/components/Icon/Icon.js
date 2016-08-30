/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Icon.css';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    glyph: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.glyph !== this.props.glyph ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { glyph, className } = this.props;
    const iconClassName = classnames('material-icons', styles.root, className);

    return (
      <i className={iconClassName}>{glyph}</i>
    );
  }
}

export default Icon;
