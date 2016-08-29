import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import UserAvatar from '../../UserAvatar/UserAvatar';
import styles from './ReadState.css';

class ReadState extends Component {
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

  renderSending() {
    return (
      <div className={styles.sending}>
        Sending
      </div>
    );
  }

  renderSent() {
    return (
      <div className={styles.sent}>
        <div className={styles.dot} /> Sent
      </div>
    );
  }

  renderRead() {
    const { readBy } = this.props;
    const readClassName = classnames(styles.read, {
      [styles.inline]: readBy.length > 4
    });

    function getReaders() {
      if (readBy.length > 4) {
        return `${readBy.length} people`;
      }

      return readBy.map((reader, index) => (
        <UserAvatar
          className={styles.avatar}
          user={reader}
          key={index}
          size="tiny"
        />
      ));
    }

    return (
      <div className={readClassName}>
        Read by {getReaders()}
      </div>
    );
  }

  renderError() {
    return (
      <div className={styles.error}>
        Error
      </div>
    );
  }

  renderState() {
    const { state } = this.props;

    switch (state) {
      case 'SENDING':
        return this.renderSending();
      case 'SENT':
        return this.renderSent();
      case 'READ':
        return this.renderRead();
      case 'ERROR':
      default:
        return this.renderError();
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

export default ReadState;
