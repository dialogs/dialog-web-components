import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './PeerAvatar.css';

class PeerAvatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    peer: PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
      placeholder: PropTypes.oneOf([
        'empty',
        'lblue',
        'blue',
        'purple',
        'red',
        'orange',
        'yellow',
        'green'
      ])
    }).isRequired,
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'big']).isRequired,
    online: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.online !== this.props.online ||
           nextProps.peer !== this.props.peer ||
           nextProps.size !== this.props.size ||
           nextProps.className !== this.props.className;
  }

  renderAvatar() {
    const { className, size, peer, onClick } = this.props;

    return (
      <Avatar
        className={className}
        size={size}
        image={peer.avatar}
        title={peer.title}
        placeholder={peer.placeholder}
        onClick={onClick}
      />
    );
  }

  render() {
    const { online } = this.props;

    if (online) {
      return (
        <div className={styles.root}>
          {this.renderAvatar()}
          <div className={styles.online} />
        </div>
      );
    }

    return this.renderAvatar();
  }
}

export default PeerAvatar;
