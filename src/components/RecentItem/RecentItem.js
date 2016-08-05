/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './RecentItem.css';
import UserAvatar from '../UserAvatar/UserAvatar';

class RecentItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    peer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    active: PropTypes.bool.isRequired,
    counter: PropTypes.number.isRequired,
    lastMessage: PropTypes.shape({
      peer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        image: PropTypes.string
      }).isRequired,
      message: PropTypes.string.isRequired
    }),
    typing: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    counter: 0,
    active: false
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
           nextProps.peer !== this.props.peer ||
           nextProps.active !== this.props.active ||
           nextProps.lastMessage !== this.props.lastMessage ||
           nextProps.typing !== this.props.typing ||
           nextProps.counter !== this.props.counter ||
           nextProps.onSelect !== this.props.onSelect;
  }

  handleClick() {
    const { peer, onSelect } = this.props;

    onSelect(peer);
  }

  renderAvatar() {
    const { peer, lastMessage } = this.props;
    const avatarSize = lastMessage ? 'large' : 'medium';

    return (
      <UserAvatar
        className={styles.avatar}
        size={avatarSize}
        user={peer}
      />
    );
  }

  renderText() {
    const { peer, lastMessage } = this.props;
    if (lastMessage) {
      return (
        <div className={styles.text}>
          <div className={styles.title}>{peer.title}</div>
          <div className={styles.message}>{lastMessage.message}</div>
        </div>
      );
    }

    return (
      <div className={styles.text}>
        <div className={styles.title}>{peer.title}</div>
      </div>
    );
  }

  renderCounter() {
    const { counter } = this.props;
    if (counter === 0) {
      return null;
    }

    return (
      <div className={styles.counter}>
        {counter}
      </div>
    );
  }

  render() {
    const { active, counter, lastMessage } = this.props;
    const className = classNames(styles.root, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
      [styles.large]: lastMessage
    }, this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        {this.renderAvatar()}
        {this.renderText()}
        {this.renderCounter()}
      </div>
    );
  }
}

export default RecentItem;
