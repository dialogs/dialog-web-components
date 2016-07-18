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
      <div className={styles.container}>
        {this.props.text}
      </div>
    );
  }
}

export default ServiceMessage;
