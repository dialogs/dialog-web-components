import React, { Component, PropTypes } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import UserAvatar from '../UserAvatar/UserAvatar';
import MessageState from './MessageState/MessageState';
import MessageActions from './MessageActions/MessageActions';
import styles from './Message.css';

class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({
      date: PropTypes.string.isRequired,
      reactions: PropTypes.object.isRequired,
      rid: PropTypes.number.isRequired,
      state: PropTypes.object.isRequired,
      sender: PropTypes.object.isRequired,
      content: PropTypes.object.isRequired
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.message !== this.props.message;
  }

  renderState() {
    const { message: { state } } = this.props;

    return (
      <MessageState state={state.state} readBy={state.readBy} />
    );
  }

  render() {
    const { message: { content, sender, date } } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.avatar}>
          <UserAvatar user={sender} size="large" />
        </div>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.sender}>{sender.name}</div>
            <time className={styles.timestamp}>{date}</time>
            {this.renderState()}
          </div>
          <div className={styles.content}>
            <MessageContent content={content} />
          </div>
          <MessageActions className={styles.actions} />
        </div>
      </div>
    );
  }
}

export default Message;
