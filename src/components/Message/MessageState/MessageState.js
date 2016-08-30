import React, { Component, PropTypes } from 'react';
import MessageSending from './MessageSending';
import MessageSent from './MessageSent';
import MessageRead from './MessageRead';
import MessageError from './MessageError';

import styles from './MessageState.css';

class MessageState extends Component {
  static propTypes = {
    state: PropTypes.oneOf(['SENDING', 'SENT', 'READ', 'ERROR']).isRequired,
    readBy: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
      placeholder: PropTypes.oneOf(['empty', 'blue', 'orange', 'green'])
    }))
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.state !== this.props.state ||
           nextProps.readBy !== this.props.readBy;
  }

  renderState() {
    const { state, readBy } = this.props;

    switch (state) {
      case 'SENDING':
        return (
          <MessageSending />
        );
      case 'SENT':
        return (
          <MessageSent />
        );
      case 'READ':
        return (
          <MessageRead readBy={readBy} />
        );
      case 'ERROR':
      default:
        return (
          <MessageError />
        );
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderState()}
      </div>
    );
  }
}

export default MessageState;
