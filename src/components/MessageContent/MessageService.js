import React, { Component, PropTypes } from 'react';
import styles from './MessageService.css';

class ServiceMessage extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }

  render() {
    return (
      <p className={styles.root}>
        {this.props.text}
      </p>
    );
  }
}

export default ServiceMessage;
