/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './RecentItem.css';
import PeerAvatar from '../PeerAvatar/PeerAvatar';

class RecentItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PropTypes.shape({
      peer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['user', 'group']).isRequired
      }).isRequired,
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    active: PropTypes.bool.isRequired,
    counter: PropTypes.number.isRequired,
    text: PropTypes.string,
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
           nextProps.peerInfo !== this.props.peerInfo ||
           nextProps.active !== this.props.active ||
           nextProps.counter !== this.props.counter ||
           nextProps.text !== this.props.text ||
           nextProps.onSelect !== this.props.onSelect;
  }

  handleClick() {
    const { peerInfo: { peer }, onSelect } = this.props;

    onSelect(peer);
  }

  renderAvatar() {
    const { peerInfo, text } = this.props;
    const avatarSize = text ? 'large' : 'medium';

    return (
      <PeerAvatar
        className={styles.avatar}
        size={avatarSize}
        peer={peerInfo}
      />
    );
  }

  renderText() {
    const { peerInfo, text } = this.props;

    if (text) {
      return (
        <div className={styles.text}>
          <div className={styles.title}>{peerInfo.title}</div>
          <div className={styles.message}>{text}</div>
        </div>
      );
    }

    return (
      <div className={styles.text}>
        <div className={styles.title}>{peerInfo.title}</div>
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
    const { active, counter, text } = this.props;
    const className = classNames(styles.root, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
      [styles.large]: text
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
