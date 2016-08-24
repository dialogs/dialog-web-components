import React, { Component, PropTypes } from 'react';
import styles from './Text.css';

class Text extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }

  render() {
    const { text } = this.props;

    return (
      <p className={styles.root}>{text}</p>
    );
  }
}

export default Text;
