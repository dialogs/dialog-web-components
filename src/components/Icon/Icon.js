/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Icon.css';

/**
 * Simple icon component
 *
 * Used to display Google Material Icons
 */
class Icon extends Component {
  static propTypes = {

    /**
     * Class name which will be added to icon `classNames`
     */
    className: PropTypes.string,

    /**
     * You can find all available glyph names here: https://design.google.com/icons
     */
    glyph: PropTypes.string.isRequired,

    /**
     * Click handler function, which will be executed when icon is clicked
     */
    onClick: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.glyph !== this.props.glyph ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { glyph, className, onClick } = this.props;
    const iconClassName = classNames('material-icons', styles.root, className);

    return (
      <i className={iconClassName} onClick={onClick}>{glyph}</i>
    );
  }
}

export default Icon;
