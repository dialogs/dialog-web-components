import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import UserAvatar from '../../UserAvatar/UserAvatar';
import styles from './MessageState.css';

class MessageRead extends Component {
  static propTypes = {
    readBy: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
      placeholder: PropTypes.oneOf(['empty', 'blue', 'orange', 'green'])
    })).isRequired
  };

  getReaders() {
    const { readBy } = this.props;

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

  render() {
    const { readBy } = this.props;
    const readClassName = classNames(styles.read, {
      [styles.inline]: readBy.length > 4
    });

    return (
      <div className={readClassName}>
        Read by {this.getReaders()}
      </div>
    );
  }
}

export default MessageRead;
