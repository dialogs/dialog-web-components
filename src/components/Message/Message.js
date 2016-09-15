import React, { Component, PropTypes } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import MessageState from './MessageState/MessageState';
import MessageActions from './MessageActions/MessageActions';
import styles from './Message.css';

class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({
      rid: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      reactions: PropTypes.array.isRequired,
      state: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      content: PropTypes.object.isRequired
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.message !== this.props.message;
  }

  renderState() {
    const { message: { state } } = this.props;
    if (state === 'unknown') {
      return null;
    }

    return (
      <MessageState state={state} />
    );
  }

  render() {
    const { message: { content, sender, date } } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.avatar}>
          <PeerAvatar peer={sender} size="large" />
        </div>
        <div className={styles.body}>
          <header className={styles.header}>
            <div className={styles.sender}>{sender.title}</div>
            <time className={styles.timestamp}>{date}</time>
            {this.renderState()}
          </header>
          <div className={styles.content}>
            <MessageContent content={content} />
          </div>
        </div>
        <MessageActions className={styles.actions} />
      </div>
    );
  }
}

export default Message;
