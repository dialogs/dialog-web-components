import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconButton from '../../IconButton/IconButton';
import styles from './MessageActions.css';

class MessageActions extends Component {
  static propTypes = {
    className: PropTypes.string
    // message: PropTypes.shape({
    //   date: PropTypes.string.isRequired,
    //   reactions: PropTypes.object.isRequired,
    //   rid: PropTypes.number.isRequired,
    //   state: PropTypes.object.isRequired,
    //   sender: PropTypes.object.isRequired,
    //   content: PropTypes.object.isRequired
    // })
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className;
  }

  render() {
    const { className } = this.props;
    const actionsClassNames = classNames(styles.root, className);

    return (
      <div className={actionsClassNames}>
        <IconButton glyph="more_horiz" className={styles.button} />
        <IconButton glyph="reply" className={styles.button} />
        <IconButton glyph="sentiment_satisfied" className={styles.button} />
      </div>
    );
  }
}

export default MessageActions;
