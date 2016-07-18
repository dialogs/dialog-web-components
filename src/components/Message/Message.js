import React, { Component, PropTypes } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import styles from './Message.css';

class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({
      content: PropTypes.object.isRequired
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.message !== this.props.message;
  }

  render() {
    const { message: { content } } = this.props;

    return (
      <div className={styles.container}>
        <MessageContent content={content} />
      </div>
    );
  }
}

export default Message;
